# DSH 兼容与社区约定

核对日期：2026-09-27。Skill 版本：0.1.1。宿主基线：[DSH 0.1.7-rc.2](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.7-rc.2)。宿主仍为预发布版。

## 安装和调用

- 继续使用 `dsh-upstream-first-debug/SKILL.md` 目录格式。用户根为 `~/.dsh/skills`，显式 DSH_HOME 使用其下的 skills。项目根支持 `.dsh/skills` 和 `.agents/skills`；最近含 `.git` 的祖先为项目根，没有 `.git` 时使用 cwd。
- 同名项目副本优先于用户副本；自定义根优先于用户根。更新后仍出现旧内容时先检查同名副本和重新加载。
- 新版支持用户消息中的 `/dsh-upstream-first-debug` 显式调用。宿主需启用对应技能提供方和调用工具；本包不自动安装这些能力。
- 本 Skill 只声明 name 与 description，模型和用户调用沿用默认允许。需要自定义时，新版支持的策略键为 `disable-model-invocation` 与 `user-invocable`；旧式 camelCase 键会使技能被忽略。
- 模型目录的描述默认最多 500 字符；本技能描述低于该长度。发现摘要不包含完整正文，须实际加载后使用。

规则依据：[固定版本 Skills 文档](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/docs/subsystems/skills.md)、[文件提供方源码](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/packages/skill/skill-filesystem/src/index.ts)、[调用工具源码](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/packages/skill/tool-skill/src/index.ts)。

## 精确版本兼容表

| Skill 包 | DSH 加载组件 | 已验证范围 | 结果 |
| --- | --- | --- | --- |
| 0.1.0 | 本地 0.1.2-rc.1 环境，含本地提交 | 用户根发现、完整加载、工具输出；2026-09-15 | 通过（历史记录） |
| 0.1.0 | 官方 0.1.6-alpha.1 | 用户根发现、完整加载、工具输出；2026-09-15 | 通过（历史记录） |
| 0.1.0 | 官方 0.1.7-rc.2 | 用户根发现、完整加载、工具输出、显式调用；2026-09-27 | 通过 |
| 0.1.1 | 官方 0.1.7-rc.2 | ZIP 解压后的用户根和两种项目根发现、完整加载、工具输出、显式调用 | 通过 |
| 0.1.1 | 官方 0.1.6-alpha.1 | ZIP 解压后的用户根发现、完整加载、工具输出 | 通过 |

表中列出实际测过的端点；其他版本未知。测试使用真实发布组件，替代宿主事件注册壳；未启动完整桌面/Web UI，未请求模型，不证明自动触发率或效果。详见 VALIDATION.md。

## 分发与维护

本包为纯 Skill，通过文件夹安装，不是 `dsh plugin add` 的插件 bundle，无需用户安装 Node 依赖。采用 dsh- 名称说明用途，不使用官方标志或声称官方背书。依据：[品牌说明](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/BRAND_GUIDELINES.md)、[插件打包说明](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/docs/user/develop/basic/publish.md)。

一包优先，仅在已证实且不能兼容的格式/行为差异出现时分维护线；Skill 版本和 DSH 版本分别管理。旧 Release 的固定包保留，内容变化发布新 Skill 版本。没有承诺所有历史版本或未来版本兼容。
