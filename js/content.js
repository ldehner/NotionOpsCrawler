// content.js
function getTitle() {
  var title = document.querySelector('[aria-label="Title Field"]');
  if (title) {
    return title.value;
  }
  title = document.querySelector('[aria-label="Title field"]');
  const value = title ? title.value : "Element not found";
  return value;
}

function getHours() {
  var hours = document.querySelector('[aria-label="Remaining Work"]');
  if (hours) {
    return hours.value;
  }
  hours = document.getElementById("__bolt-Remaining-Work-input");
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
