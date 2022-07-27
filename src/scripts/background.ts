import * as BrowserCommands from './browser-commands';
import { matchUrl } from './match-url';

let urls: string[] = [];
let os: string;

chrome.runtime.getPlatformInfo((platformInfo) => {
  os = platformInfo.os;
});

(async () => {
  const item = await chrome.storage.sync.get('urls');
  if (item.urls) {
    urls = item.urls;
  }
})();

chrome.storage.onChanged.addListener(async (changes) => {
  // 监听到 urls 的变化
  if (changes.urls) {
    urls = changes.urls.newValue;
  }
});

interface IKeyDownEvent {
  tabId: number;
  key: string;
  code: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}

function reissueKeyDownEvent({
  tabId,
  key,
  code,
  ctrlKey = false,
  altKey = false,
  shiftKey = false,
  metaKey = false,
}: IKeyDownEvent) {
  chrome.scripting.executeScript({
    func: (...args) => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: args[0] as string,
          code: args[1] as string,
          bubbles: true,
          cancelable: true,
          ctrlKey: args[2] as boolean,
          altKey: args[3] as boolean,
          shiftKey: args[4] as boolean,
          metaKey: args[5] as boolean,
          composed: true,
        }),
      );
    },
    args: [key, code, ctrlKey, altKey, shiftKey, metaKey],
    target: { tabId },
  });
}

function isUrlHit(targetUrl: string) {
  for (const url of urls) {
    if (matchUrl(targetUrl, url)) {
      return true;
    }
  }
  return false;
}

chrome.commands.onCommand.addListener(async (command, tab) => {
  const tabId = tab.id;
  const tabUrl = tab.url;
  if (!tabId || !tabUrl) {
    return;
  }

  // 补发 ide 的快捷键不用区分大小写
  switch (command) {
    case 'closeCurrentTab': {
      if (isUrlHit(tabUrl)) {
        reissueKeyDownEvent({
          tabId,
          key: 'W',
          code: 'KeyW',
          shiftKey: true,
          altKey: true,
        });
      } else {
        BrowserCommands.closeCurrentTab(tabId);
      }
      break;
    }
    case 'openNewTab': {
      if (isUrlHit(tabUrl)) {
        if (os === 'mac') {
          reissueKeyDownEvent({ tabId, key: 'O', code: 'KeyO', metaKey: true });
        } else {
          reissueKeyDownEvent({
            tabId,
            key: 'O',
            code: 'KeyO',
            ctrlKey: true,
            altKey: true,
          });
        }
      } else {
        BrowserCommands.openNewTab(tab);
      }
      break;
    }
    case 'openNewWindow': {
      if (isUrlHit(tabUrl)) {
        reissueKeyDownEvent({ tabId, key: 'N', code: 'KeyN', altKey: true });
      } else {
        BrowserCommands.openNewWindow();
      }
      break;
    }
    case 'reopenPreviouslyClosedTab': {
      if (isUrlHit(tabUrl)) {
        reissueKeyDownEvent({
          tabId,
          key: 'T',
          code: 'KeyT',
          altKey: true,
          shiftKey: true,
        });
      } else {
        BrowserCommands.reopenPreviouslyClosedTab();
      }
      break;
    }
    case 'closeCurrentWindow': {
      if (isUrlHit(tabUrl)) {
        BrowserCommands.closeCurrentTab(tabId);
      } else {
        const window = await chrome.windows.getCurrent();
        window.id && BrowserCommands.closeCurrentWindow(window.id);
      }
      break;
    }
  }
});
