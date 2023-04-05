chrome.commands.onCommand.addListener((command) => {
  if (command === "start-record") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'start-recording' })
    })
  } else if (command === "toggle-language") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'toggle-language' })
    })
  }
});
