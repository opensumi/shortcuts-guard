export function closeCurrentTab(tabId: number) {
  chrome.tabs.remove(tabId);
}

export function closeCurrentWindow(windowId: number) {
  chrome.windows.remove(windowId);
}

export function openNewTab(tab: chrome.tabs.Tab) {
  chrome.tabs.create({
    windowId: tab.windowId,
    active: true,
    url: 'chrome://newtab',
  });
}

export function openNewWindow() {
  chrome.windows.create();
}

export function reopenPreviouslyClosedTab() {
  chrome.sessions.restore();
}
