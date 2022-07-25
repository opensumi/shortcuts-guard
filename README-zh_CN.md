# Shortcuts Guard

![prettier code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

[English](./README.md) | 简体中文

OpenSumi IDE 快捷键存在和谷歌浏览器快捷键冲突的情况，这些情况让 OpenSumi IDE 对应行为无法生效。Shortcuts Guard 解决常用的快捷键冲突。

## 使用说明

- 点击插件图标，然后会出现一个 popup 页面。
- 在 popup 页面中输入 URL ，插件会在你输入的 URL 上守护 OpenSumi IDE 快捷键。
- 点击 popup 页面右上角键盘图标，前往[快捷键设置页面](chrome://extensions/shortcuts)，然后输入冲突的快捷键。

## 守护的快捷键

| **Windows 快捷键** | **Mac 快捷键** | **OpenSumi IDE Action** | **Chrome Action**                          |
| :----------------- | :------------- | :---------------------- | :----------------------------------------- |
| Ctrl + n           | ⌘ + n          | 新的无标题文件          | 打开新窗口                                 |
| Ctrl + w           | ⌘ + w          | 关闭编辑器              | 关闭当前标签页                             |
| Ctrl + t           | ⌘ + t          | 展示工作区符号          | 打开新的标签页，并跳转到该标签页           |
| Ctrl + Shift + t   | ⌘ + Shift + t  | 重新打开已关闭的编辑器  | 按标签页的关闭顺序重新打开先前关闭的标签页 |
| Ctrl + Shift + w   | ⌘ + Shift + w  | 关闭当前标签页          | 关闭当前窗口                               |

> 参考 [Chrome 快捷键 ](https://support.google.com/chrome/answer/157179?co=GENIE.Platform%3DDesktop&hl=zh-Hans#zippy=%2C%E6%A0%87%E7%AD%BE%E9%A1%B5%E5%92%8C%E7%AA%97%E5%8F%A3%E5%BF%AB%E6%8D%B7%E9%94%AE)和 [VS Code 快捷键](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

