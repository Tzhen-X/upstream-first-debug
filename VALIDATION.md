# 验证范围与结果

当前验证版本：0.1.1。最新验证日期：2026-09-27。平台：Windows。

## 0.1.1 最新版组件验证

三个官方 npm 包 dsh-skill、dsh-skill-filesystem、dsh-tool-skill 均固定 0.1.7-rc.2，隔离安装且禁用生命周期脚本。用实际 v0.1.1 ZIP 解压后的文件测试，用户根、项目 .dsh/skills 和项目 .agents/skills 共 3 种布局均通过发现、默认双调用策略、完整正文、工具输出渲染和用户显式调用。通用版 ZIP 在新版共享技能项目根也通过。

同一 v0.1.1 DSH ZIP 在官方 0.1.6-alpha.1 组件中通过用户根发现、完整正文和工具输出；旧 v0.1.0 指令在 0.1.7-rc.2 中亦通过，核心正文没有改变。新版每个 ZIP 为 7 文件，增加 DSH-COMPATIBILITY.md。

维护者可在临时目录安装这三个指定版本的 npm 测试依赖，使用仓库 scripts/check_dsh.mjs；参数 --runtime-root 指向含这些依赖的目录，--skill-dir 指向解压后的技能目录，--work-dir 必须为尚不存在的隔离目录。--layout 可选 user-dsh、project-dsh 或 project-agents；在 0.1.7-rc.2 使用 --check-slash true 验证显式调用。该脚本不请求模型，也不修改用户技能根。

这是加载组件验收，宿主事件注册壳由测试替代。未启动完整桌面/Web UI、未验证在途会话热刷新，也未重新进行 Codex 接口验收；首版 Codex 发现证据仅属于 0.1.0。

## 0.1.0 历史验收（2026-09-15）

## 实际执行

| 项目 | 方法 | 结果 |
| --- | --- | --- |
| 两版格式 | 技能校验器检查名称及 frontmatter | 2/2 通过 |
| 正文一致性 | 通用与 DSH 版正文逐字比较 | 一致；仅名称和描述有发行版差异 |
| ZIP 安装布局 | 本地打包后解压到各自文档指定的技能根 | 每包 6 文件，名称目录直接包含 SKILL.md |
| Codex 发现 | Codex CLI 0.153.4，隔离 CODEX_HOME，真实 app-server initialize 与 skills/list | 项目 .agents/skills 中的打包版本可发现，enabled=true |
| DSH 发现 | DSH 0.1.2-rc.1，本地源码基线 99baa37e8fe8d8050cd50991e35f70ccdb287038，隔离用户根 | user-dsh 来源可发现，模型及用户调用标记均为 true |
| DSH 加载工具 | 调用官方 tool-skill 的 execute 与输出渲染方法，连接真实 SkillRegistry 与 SkillFilesystem | 读到完整正文，并生成面向模型的 skill_content 包装 |

DSH 加载测试仅替代了宿主事件注册设施，没有替代技能提供方或加载逻辑；没有启动完整 Web UI 或调用模型。Codex 验证的是发现接口，没有把它等同于模型实际遵守指令。两者均未修改现役技能目录、用户认证或全局设置。

## 场景走查

发布整理者依据正文对 examples.md 的 6 个合成案例逐项走查，未发现规则与预期决策冲突。走查者能看到规则和预期答案，因此不能作为独立行为评测或成功率证据。

## 仍未证明的事项

- 不同模型的自动触发率、指令遵守率、排障成功率或时间节省。
- DSH 完整 UI 流程、Linux/macOS 的现场安装及未来宿主版本兼容性。
- 与其他调试 Skill 相比的效果优势。

本项目是可选指令包，无法代替宿主的安全机制和用户判断。后续应以真实反馈完善，不把单次通过扩大成兼容或效果保证。
