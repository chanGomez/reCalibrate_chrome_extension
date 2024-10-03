chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id }, // target the current tab
      files: ["contentScript.js"], // inject content script
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Content script injected successfully!");
      }
    }
  );
});
