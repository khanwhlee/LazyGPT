let LANGUAGE = 'cmn-Hant-TW'
let STATUS = false


function initStatus() {
    if (document.querySelectorAll('form').length) {
        STATUS = true
    }
}

let timer = setInterval(function() {
    console.log("LOADING")
    if (STATUS) {
        clearInterval(timer)
    } else {
        initStatus()
    }
}, 1000)


function showStatus(value) {
    let status_obj = document.getElementById("status-id");
    if (status_obj) {
        status_obj.innerHTML = value
    } else {
        let status_div = document.createElement('div');
        status_div.id = "status-id"
        status_div.innerHTML = value
        status_div.style.position = 'absolute';
        status_div.style.top = '0';
        status_div.style.left = '0';
        status_div.style.padding = '4px';
        status_div.style.color = '#32EFBD';
        document.querySelectorAll('form')[0].querySelectorAll('div')[0].appendChild(status_div);
    }
}


function updateInputObj(content) {
    const forms = document.querySelectorAll('form')
    let textValue = forms[0].querySelectorAll('textarea')[0].value
    forms[0].querySelectorAll('textarea')[0].value = textValue + `${content} `
    forms[0].querySelectorAll('textarea')[0].focus()
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'start-recording') {
    // 開始辨識
    if (!STATUS) {
        alert("等待網頁載入中")
    }
    const recognition = new webkitSpeechRecognition()
    recognition.lang = LANGUAGE
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onstart = () => {
        console.log("START", LANGUAGE)
        showStatus("辨識中...")
    }

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        const isFinal = event.results[event.results.length - 1].isFinal
        showStatus(result)
        if (isFinal) {
            console.log("result", result)
            updateInputObj(result)
        }
    };

    recognition.onend = () => {
        recognition.stop()
        console.log("END")
        showStatus(`辨識完成 (${LANGUAGE})`)
    }

    recognition.onerror = (event) => {
        console.log(event)
        if (event.error == "not-allowed") {
            alert("請授權麥克風在此頁使用")
        }
        showStatus(event.error)
    }

    recognition.start()

    sendResponse({ reply: 'OK!' });
  } else if (message.type === "change-language") {
    LANGUAGE = message.content;
    sendResponse({ reply: 'OK!' });
  } else if (message.type === "toggle-language") {
    if (LANGUAGE == "en-US") {
        LANGUAGE = "cmn-Hant-TW"
    } else {
        LANGUAGE = "en-US"
    }
    console.log(LANGUAGE)
    showStatus(`切換語系至 ${LANGUAGE}`)
    chrome.storage.local.set({language: LANGUAGE})
    sendResponse({ reply: 'OK!' })
  }
});


