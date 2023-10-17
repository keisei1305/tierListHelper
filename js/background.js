chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("html/hello.html");
    let tab = await chrome.tabs.create({ url });

    chrome.storage.sync.get(['showClock'], (result) => {
        if (result.showClock) {
            chrome.action.setBadgeText({ text: 'ON' });
        }
    });
});