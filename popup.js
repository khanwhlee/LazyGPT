// 監聽 dropdown 選單的變更事件
const langSelect = document.getElementById("lang-select");
langSelect.addEventListener("change", () => {
    // 取得使用者所選擇的語言
    const selectedLang = langSelect.value;
    chrome.storage.local.set({language: selectedLang});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "change-language", content: selectedLang});
    });
});


chrome.storage.local.get(['language'], (result) => {
  if (result.language) {
    document.querySelector('#lang-select').value = result.language;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "change-language", content: result.language});
    });
  }
});
