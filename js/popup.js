let notionApiKey,
  databaseId,
  successBanner,
  errorBanner,
  button,
  spinner,
  taskTitle,
  taskHours;

function showBanner(banner) {
  spinner.style.display = "none";
  button.disabled = false;
  banner.style.display = "block";
  setTimeout(function () {
    banner.style.display = "none";
  }, 3000);
}

function getCurrentTabUrl(callback) {
  // Query the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Extract the URL from the first tab in the array
    var currentTab = tabs[0]; // there will be only one in this array
    var url = currentTab ? currentTab.url : null; // Check if currentTab exists
    // Pass the URL to the callback function
    callback(url);
  });
}

function saveData(exData) {
  const url = "https://api.notion.com/v1/pages";
  const data = {
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: exData.title,
            },
          },
        ],
      },
      Task: {
        select: {
          name: exData.task,
        },
      },
      Storypoints: {
        number: exData.hours,
      },
      URL: {
        url: exData.URL,
      },
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => showBanner(successBanner))
    .catch(() => showBanner(errorBanner));
}

function updateData(pageId, exData) {
  const url = `https://api.notion.com/v1/pages/${pageId}`;
  const data = {
    properties: {
      Name: {
        title: [
          {
            text: {
              content: exData.title,
            },
          },
        ],
      },
      Task: {
        select: {
          name: exData.task,
        },
      },
      Storypoints: {
        number: exData.hours,
      },
      URL: {
        url: exData.URL,
      },
    },
  };

  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => showBanner(successBanner))
    .catch(() => showBanner(errorBanner));
}

function checkIfExists(task) {
  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const data = {
    filter: {
      property: "Task",
      select: {
        equals: task,
      },
    },
  };

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        showBanner(errorBanner);
      }
      return response.json();
    })
    .catch((err) => {
      showBanner(errorBanner);
      throw err; // Rethrow after logging so it can be caught or handled by a caller
    });
}

// Function to extract data
function extractData() {
  button = document.getElementById("syncToNotion");
  button.disabled = true;
  spinner = document.getElementById("spinner");
  spinner.style.display = "block";
  successBanner = document.getElementById("saveSuccess");
  errorBanner = document.getElementById("saveError");
  if (notionApiKey === undefined || databaseId === undefined) {
    chrome.storage.local.get(["apiKey", "databaseId"], function (result) {
      notionApiKey = result.apiKey;
      databaseId = result.databaseId;
      main();
    });
  } else main();
}

function main() {
  getCurrentTabUrl(function (url) {
    const segments = url.split("/");
    const editIndex = segments.indexOf("edit");
    const taskId = segments[editIndex + 1];
    const data = {
      task: taskId,
      title: taskTitle,
      hours: parseInt(taskHours),
      URL: url === undefined ? "https://test.at" : url,
      // Add other data extraction logic here
    };
    checkIfExists(data.task).then((response) => {
      if (response.results.length === 0) {
        saveData(data);
      } else {
        updateData(response.results[0].id, data);
      }
    });
  });
}

document.getElementById("syncToNotion").addEventListener("click", function () {
  // Query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Send a message to the content script
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "callFunctionInContentScript" },
      function (response) {
        taskTitle = response.response.title;
        taskHours = response.response.hours;
        extractData();
      }
    );
  });
});
