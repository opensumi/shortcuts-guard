# 发布流程

## 在 `main` 分支发布

假设我们想在 `main` 分支上发布版本 `v0.0.5`。

- 步骤 1：更新 package.json 和 manifest.json 文件的 `version` 字段为 `0.0.5` 。创建一个 PR 或者直接推送一个 commit 到 Shortcuts Guard 仓库。这里有一个 [PR](https://github.com/opensumi/shortcuts-guard/pull/34/files) 可供参考。
- 步骤 2：请先等待 CI 工作流成功结束再进行步骤 3。如果 CI 工作流抛出错误，请先解决引起错误的问题。
- 步骤 3：如果使用 PR 的方式，我们需要合并 PR 后才能进行步骤 4。

![Run workflow](https://gw.alipayobjects.com/zos/antfincdn/zy6NF9ue%26/lQLPJxbEnXKx_mbNAYHNAaqwksqDiEb2Yo8DQzNLkIAcAA_426_385.png)

- 步骤 4：在 Shortcuts Guard 仓库的 Actions 页面内选择 Release 工作流，点击序号 1 的 Run workflow 按钮，在弹出的面板内点击序号 2 的分支选择按钮，选择运行分支为 `main` ，在标记为序号 3 的输入框内输入将要分布的版本 `0.0.5` ，点击序号 4 的运行按钮，运行 Release 工作流。如果工作流成功结束，那么插件就会被发布到 GitHub 仓库和 Chrome Web Store，否则请排查工作流抛出的错误。

## 在 `v*.*` 分支上发布

假设我们想在 `v0.0` 分支上发布版本 `v0.0.5`。

- 步骤 1：更新 package.json 和 manifest.json 文件的 `version` 字段为 `0.0.5` 。创建一个 PR 或者直接推送一个 commit 到 Shortcuts Guard 仓库。
- 步骤 2：请先等待 CI 工作流成功结束再进行步骤 3。如果 CI 工作流抛出错误，请先解决引起错误的问题。
- 步骤 3：如果使用 PR 的方式，我们需要合并 PR 后才能进行步骤 4。

![Run workflow](https://gw.alipayobjects.com/zos/antfincdn/zy6NF9ue%26/lQLPJxbEnXKx_mbNAYHNAaqwksqDiEb2Yo8DQzNLkIAcAA_426_385.png)

- 步骤 4：在 Shortcuts Guard 仓库的 Actions 页面内选择 Release 工作流，点击序号 1 的 Run workflow 按钮，在弹出的面板内点击序号 2 的分支选择按钮，选择运行分支为 `v0.0` ，在标记为序号 3 的输入框内输入将要分布的版本 `0.0.5` ，点击序号 4 的运行按钮，运行 Release 工作流。如果工作流成功结束，那么插件就会被发布到 GitHub 仓库和 Chrome Web Store，否则请排查工作流抛出的错误。
- 步骤 5：发布成功后，将 `v0.0` 分支的修改内容合并到 `main` 分支。
