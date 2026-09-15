# upstream-first-debug · 上游优先排障

[English](README.en.md)

第三方工具报错时，先确认实际运行版本、核对上游修复是否已发布，再决定本地修复，并通过用户实际入口验证结果。

作者 **Tzhen** · **MIT** · 版本 **0.1.0** · 指令正文为中文。

## 为什么用它

“已经安装最新版”可能仍调用缓存中的旧副本；“PR 已合并”不代表安装包已包含修复；直接 API 成功也不代表用户的插件入口恢复。本 Skill 把这些核对放在本地改造之前，减少缺少证据的修补。

流程：**确认实际运行对象 → 核对发布制品 → 查相似问题与修复 → 决定下一步 → 通过真实入口验证。** 它是指令型 Skill，不是拦截程序；不承诺强制执行或量化提效。

## 选择一个版本

| 使用环境 | 目录／技能名称 | 默认用户安装位置 |
| --- | --- | --- |
| Codex 等支持共享技能的 Agent | [upstream-first-debug](skills/upstream-first-debug/README.md) | ~/.agents/skills/upstream-first-debug |
| DeepSeek Harness（DSH） | [dsh-upstream-first-debug](skills/dsh-upstream-first-debug/README.md) | ~/.dsh/skills/dsh-upstream-first-debug |

两个版本使用相同排障正文，DSH 版只调整名称和适用描述。通常选择一个即可；不要把两份当成不同的排障方法。

## 安装与调用

- [通用版 ZIP](https://github.com/Tzhen-X/upstream-first-debug/releases/download/v0.1.0/upstream-first-debug-0.1.0.zip)
- [DSH 版 ZIP](https://github.com/Tzhen-X/upstream-first-debug/releases/download/v0.1.0/dsh-upstream-first-debug-0.1.0.zip)

下载对应 ZIP 并解压，将其中以技能名命名的文件夹放进目标技能根；或从本仓库的 skills 目录复制所选文件夹。最终必须是“技能根 / 技能名称 / SKILL.md”，不要多嵌套一层仓库目录。安装前检查是否已有同名副本，更新时先备份。安装包见 [v0.1.0 Release](https://github.com/Tzhen-X/upstream-first-debug/releases/tag/v0.1.0)。

新开任务，明确说“使用 upstream-first-debug 排查这个第三方工具错误”，DSH 版用其完整名称。先确认 Agent 读取了技能。自动选择由宿主与模型决定；没有出现时检查安装根及目录层级。

用户技能目录的依据：[Codex 官方技能文档](https://developers.openai.com/codex/skills)、[DSH 官方技能文档](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/skills.md)。DSH 配置了 DSH_HOME 时使用该目录下的 skills；项目级安装及限制见各版安装说明。

## 适用范围

- 第三方开源工具、插件、MCP 或依赖首次出现错误或异常结果。
- 需要区分旧副本、未发布修复、已关闭但未解决的问题、入口不一致。
- 不用于自研业务代码的一般调试，也不替代权限规则、升级策略或用户指令。

## 验证与来源

[验证范围](VALIDATION.md)区分真实加载检查和合成场景走查；[示例](examples.md)可供复验。[相关工作](SOURCES.md)说明差异，不宣称全球首创。[DSH 社区约定](DSH-COMPATIBILITY.md)说明命名、分发与适用规范。

独立维护，无 DSH 或 OpenAI 官方背书。许可证见 [LICENSE](LICENSE)。

## 维护与本地打包

维护通用版正文后，运行 `python scripts/package.py --sync-dsh` 同步 DSH 版的名称差异；运行 `python scripts/package.py` 校验并生成两份 ZIP 到 dist。脚本仅使用 Python 标准库，不联网、不安装技能、不上传仓库。

提交改进时请说明具体失败场景、实际版本、已有证据及期望变化，并去除账号、凭据和私人日志。优先修正可复现问题，避免增加无差别的全局约束。
