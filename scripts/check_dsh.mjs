// Component-level compatibility probe. No model requests or host settings changes.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) => {
  if (i % 2 === 0) pairs.push([value, all[i + 1]]);
  return pairs;
}, []));
for (const key of ['--runtime-root', '--skill-dir', '--work-dir']) {
  assert(args[key], `Required: ${key}`);
}
const base = path.resolve(args['--work-dir']);
assert(!fs.existsSync(base), 'Use a fresh isolated work directory');
const layout = args['--layout'] ?? 'user-dsh';
assert(['user-dsh', 'project-dsh', 'project-agents'].includes(layout));
const req = createRequire(path.join(path.resolve(args['--runtime-root']), 'package.json'));
const imp = name => import(pathToFileURL(req.resolve(name)));
const { Context } = await imp('@deepseek-ai/cordis');
const { default: Registry } = await imp('@deepseek-ai/dsh-skill');
const Provider = await imp('@deepseek-ai/dsh-skill-filesystem');
const Consumer = await imp('@deepseek-ai/dsh-tool-skill');
const cwd = path.join(base, 'project');
fs.mkdirSync(path.join(cwd, '.git'), { recursive: true });
const skillDir = path.resolve(args['--skill-dir']);
const text = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');
const name = text.match(/^name: (.+)$/m)?.[1].trim();
assert(name);
const root = layout === 'user-dsh' ? path.join(base, 'home', 'skills')
  : path.join(cwd, layout === 'project-dsh' ? '.dsh' : '.agents', 'skills');
fs.cpSync(skillDir, path.join(root, name), { recursive: true });
const ctx = new Context();
try {
  await ctx.plugin(Registry);
  await ctx.plugin(Provider, { watch: false, dshHome: path.join(base, 'home'), agentsHome: path.join(base, 'agents') });
  const summary = (await ctx.skills.list({ cwd })).find(skill => skill.name === name);
  assert(summary, 'Packaged skill must be discovered');
  assert.equal(summary.source, layout);
  assert.equal(summary.invocation.modelInvocable, true);
  assert.equal(summary.invocation.userInvocable, true);
  let loader;
  const callbacks = [];
  Consumer.apply({ skills: ctx.skills, tools: { register: tool => { loader = tool; } },
    on: (event, callback) => { callbacks.push([event, callback]); return () => {}; } }, {});
  const agent = { session: { header: { cwd } } };
  const signal = new AbortController().signal;
  const value = await loader.execute({ name }, { agent, signal });
  assert.equal(value.content.trim(), text.split('---').slice(2).join('---').trim());
  const rendered = loader.output.render({ name }, value);
  assert(rendered.some(block => block.type === 'text' && block.text.includes('<skill_content') && block.text.includes(name)));
  let slashInvocation = 'not-tested';
  if (args['--check-slash'] === 'true') {
    const callback = callbacks.find(([event]) => event === 'agent/pre-step')?.[1];
    assert(callback, 'User invocation callback must be registered');
    const decision = await callback({ agent, signal, messages: [{ source: { kind: 'user' }, content: [{ type: 'text', text: `/${name}` }] }] },
      async () => ({ kind: 'continue', messages: [] }));
    assert(decision.messages.some(message => message.source.kind === 'skill-invocation' && message.source.name === name));
    slashInvocation = 'passed';
  }
  const versions = Object.fromEntries(['@deepseek-ai/dsh-skill', '@deepseek-ai/dsh-skill-filesystem', '@deepseek-ai/dsh-tool-skill']
    .map(n => [n, JSON.parse(fs.readFileSync(req.resolve(`${n}/package.json`), 'utf8')).version]));
  const result = { versions, name, source: summary.source, discovered: true, invocation: summary.invocation,
    fullBodyEqual: true, rendered: true, slashInvocation, modelCalls: 0,
    skillSha256: crypto.createHash('sha256').update(text).digest('hex'),
    boundary: 'Real registry, filesystem provider and consumer; host event registration is stubbed. No full UI or model-effect test.' };
  fs.writeFileSync(path.join(base, 'result.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result, null, 2));
} finally {
  await ctx.dispose?.();
}
