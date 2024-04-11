// content.js
function getTitle() {
  const title = document.querySelector('[id^="__bolt-textfield-input-"]');
  const value = title ? title.value : "Element not found";
  return value;
}

function getHours() {
  const hours = document.getElementById("__bolt-Remaining-Work-input");
  const value = hours ? hours.value : 0;
  return value;
}

function extractData() {
  return {
    title: getTitle(),
    hours: getHours(),
  };
}

// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "callFunctionInContentScript") {
    var responseMessage = extractData();
    sendResponse({ response: responseMessage });
  }

  // Return true to indicate you will send a response asynchronously
  return true;
});
