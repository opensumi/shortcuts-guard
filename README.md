# Shortcuts Guard

![prettier code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

English | [简体中文](./README-zh_CN.md)

The shortcuts of the OpenSumi IDE conflict with those of the Chrome, which makes the corresponding actions of OpenSumi IDE unable to take effect. Shortcuts Guard solve the most common used shortcuts conflict.

## Usage

- Click the Chrome Extension icon, and then there is a popup page.
- Add the URL which can be a match pattern in the popup page where the extension will guard the OpenSumi IDE shortcuts.
- Click the keyboard icon in the upper right corner of the popup page to go to [the shortcut settings page](chrome://extensions/shortcuts), and then input the conflicting shortcuts.

## Match patterns

### Basic Syntax

```text
<url-pattern> := <scheme>://<host><path>
<scheme> := '*' | 'http' | 'https'
<host> := '*' | '*.' <any char except '/' and '*'>+
<path> := '/' <any chars>
```

### Examples

| Pattern                            | What it does                                                                                                                                                                               | Examples of matching URLs                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `https://*/*`                      | Matches any URL that uses the `https` scheme                                                                                                                                               | https://www.google.com/<br/>https://example.org/foo/bar.html          |
| `https://*/foo*`                   | Matches any URL that uses the `https` scheme, on any host, as long as the path starts with `/foo`                                                                                          | https://example.com/foo/bar.html<br/>https://www.google.com/foo       |
| `https://*.google.com/foo*bar`     | Matches any URL that uses the `https` scheme, is on a google.com host (such as www.google.com, docs.google.com, or google.com), as long as the path starts with `/foo` and ends with `bar` | https://www.google.com/foo/baz/bar<br/>https://docs.google.com/foobar |
| `https://example.org/foo/bar.html` | Matches the specified URL                                                                                                                                                                  | https://example.org/foo/bar.html                                      |
| `http://127.0.0.1/*`               | Matches any URL that uses the `http` scheme and is on the host 127.0.0.1                                                                                                                   | http://127.0.0.1/<br/>http://127.0.0.1/foo/bar.html                   |
| `*://mail.google.com/*`            | Matches any URL that starts with `http://mail.google.com` or `https://mail.google.com`                                                                                                     | http://mail.google.com/foo/baz/bar<br/>https://mail.google.com/foobar |

> Reference [Match patterns - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/match_patterns/)

## Guarded shortcuts

| **Windows Shortcut** | **Mac Shortcut** | **OpenSumi IDE Action** | **Chrome Action**                                           |
| :------------------- | :--------------- | :---------------------- | :---------------------------------------------------------- |
| Ctrl + n             | ⌘ + n            | New file                | Open a new window                                           |
| Ctrl + w             | ⌘ + w            | Close editor            | Close the current tab                                       |
| Ctrl + t             | ⌘ + t            | Show all Symbols        | Open a new tab, and jump to it                              |
| Ctrl + Shift + t     | ⌘ + Shift + t    | Reopen closed editor    | Reopen previously closed tabs in the order they were closed |
| Ctrl + Shift + w     | ⌘ + Shift + w    | Close the current tab   | Close the current window                                    |

> Reference [Chrome keyboard shortcuts](https://support.google.com/chrome/answer/157179?hl=en&co=GENIE.Platform%3DDesktop) and [VS Code keyboard shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
