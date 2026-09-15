# DSH 兼容与社区约定

核对日期：2026-09-15。范围：纯 Skill 文件发行版。

## 适用规定

- 官方品牌说明推荐生态项目采用 DSH 缩写，并要求避免使用户误认为官方背书。本版采用 dsh-upstream-first-debug；不使用官方标志，也不以完整产品名命名项目。产品全名仅用于说明兼容关系。[品牌说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/BRAND_GUIDELINES.md)
- 名称符合小写连字符格式。技能以名称文件夹下的 SKILL.md 交付，不能依赖递归扫描；DSH 的项目 .dsh/skills 与用户技能根均有明确发现规则。[Skills](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/skills.md)
- 当前发行版通过文件夹安装。官方 dsh plugin add 教程针对带配置层的 bundle；本包没有注册插件或 profile 配置。[插件打包说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md)

## 社区分发

官方目前不接受外部 PR，建议通过 Discussions 反馈并鼓励独立生态项目。dsh-plugin topic 的推荐对象明确为插件；本纯 Skill 不把插件上架条件当成已满足，也不声称已获官方收录。[贡献指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/CONTRIBUTING.md)

在上述官方说明中未找到针对独立纯 Skill 的额外强制上架流程；这不代表所有第三方市场都没有自己的审核条件。首版以个人仓库和可下载文件夹分发，若以后选择具体市场，再核对该市场规则。

## 本地验证边界

本机验证基于 DSH 0.1.2-rc.1，源码基线 99baa37e8fe8d8050cd50991e35f70ccdb287038；读取官方当前文档不等于已运行最新主线。详见 VALIDATION.md。DSH 仍处于开发预览，未来版本兼容性须重新验证。
