# upstream-first-debug

DSH discovery and downloads: [dsh-upstream-first-debug](https://github.com/Tzhen-X/dsh-upstream-first-debug).

[简体中文](README.md)

Check the actual runtime, upstream releases and applicable reports before patching third-party failures. Verify recovery through the user's actual entry point.

Author: Tzhen. License: MIT. Version: 0.1.0. The skill instructions are written in Chinese.

Choose `skills/upstream-first-debug` for a compatible general-purpose agent, or `skills/dsh-upstream-first-debug` for DSH. The instruction bodies are identical; the DSH edition changes only the name and description. Copy the chosen folder directly into your client's skill root. The usual user roots are `~/.agents/skills` for Codex and `~/.dsh/skills` for DSH; an explicit DSH_HOME changes the latter. Do not install the repository directory as an extra nesting layer.

Start a new task and explicitly ask the agent to use the skill. It needs the host's existing filesystem, shell and web tools. It does not auto-update software, post upstream reports or enforce a programmatic block.

See [validation](VALIDATION.md), [examples](examples.md), [related work](SOURCES.md) and [DSH compatibility](DSH-COMPATIBILITY.md). This is independently maintained and not endorsed by OpenAI or DSH. No cross-model effectiveness benchmark or guaranteed success rate is claimed.

Run `python scripts/package.py` to validate and build both ZIPs locally. It never publishes anything. Download the two distributions from [v0.1.0](https://github.com/Tzhen-X/upstream-first-debug/releases/tag/v0.1.0).
