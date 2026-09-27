# dsh-upstream-first-debug · 上游优先排障

作者：Tzhen。许可证：MIT。版本：0.1.1。正文为中文。

第三方工具报错时，先确认实际运行版本、核对上游修复是否已发布，再决定本地修复，并通过用户实际入口验证结果。

## 安装

将本文件所在的 `dsh-upstream-first-debug` 文件夹直接复制到 `~/.dsh/skills` 下，确保最终文件是 `~/.dsh/skills/dsh-upstream-first-debug/SKILL.md`。不要把整个仓库或 ZIP 外的额外目录层一起复制进去。`~` 表示当前用户主目录。

如果设置了 DSH_HOME，以其下的 skills 目录为准。项目内安装可使用项目根的 .dsh/skills。新开任务，明确输入“使用 dsh-upstream-first-debug 排查这个第三方工具错误”，确认技能被读取后再继续排障。

这是独立维护的 DSH 兼容 Skill，不是官方项目，也不是 dsh plugin add 可安装的组合包。无需 package.json、cordis.patch.yml 或修改 profile。dsh- 表示本发行版的用途，不代表官方背书。

## DSH 0.1.7-rc.2

可在用户消息中输入 `/dsh-upstream-first-debug` 显式加载，或按名称要求 Agent 使用本技能。项目也可安装到 `.agents/skills/dsh-upstream-first-debug`；这里的项目根是最近含 `.git` 的祖先，没有 `.git` 时使用当前工作目录。

同名技能的项目副本优先于用户副本。安装或更新后若仍读到旧内容，先检查同名项目副本、当前任务的技能列表和是否重新加载正文。新版支持目录变化刷新；本次验证使用隔离加载组件，未把刷新机制等同于所有在途任务即时更新。

省略调用策略字段时，模型和用户调用均默认允许，本技能沿用该默认值。无需为了升级增加旧式 `modelInvocable` 或 `userInvocable` frontmatter 字段；新版不接受这些字段。已测版本和验证边界见随包 DSH-COMPATIBILITY.md。

## 使用边界

宿主需要已有的文件读取、命令执行和联网查询能力；本 Skill 不安装这些工具。它适用于第三方开源工具、插件及依赖的失败，不用于自研业务代码的一般调试，不自动升级或发送 Issue/PR。

通用版与 DSH 版的正文相同，同一使用范围通常只需选择一种。它们名称不同，安装 DSH 版不会覆盖已在共享根安装的通用版。

若需更新，先备份当前安装文件夹，再替换这个技能文件夹；若需撤销，仅移除自己安装的本技能文件夹，并在新任务确认列表更新。不要更改其他技能。

本包中的 LICENSE、SOURCES.md、VALIDATION.md、DSH-COMPATIBILITY.md 和 examples.md 随 ZIP 一并提供。仓库浏览时，这些共同文件位于仓库根。加载验证不代表模型会始终遵守指令，也不代表排障成功率已测定。
