document.addEventListener("DOMContentLoaded", function () {
  // Load the current settings from storage
  chrome.storage.local.get(["apiKey", "databaseId"], function (result) {
    document.getElementById("apiKey").value = result.apiKey || "";
    document.getElementById("databaseId").value = result.databaseId || "";
  });

  // Add a listener to save the settings when the form is submitted
  document
    .getElementById("configForm")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form from submitting normally
      const apiKey = document.getElementById("apiKey").value;
      const databaseId = document.getElementById("databaseId").value;
      // Save the settings
      chrome.storage.local.set({ apiKey, databaseId }, function () {
        var element = document.getElementById("saveSuccess");
        element.style.display = "block";
        // Wait for 3 seconds
        setTimeout(function () {
          // Change the display property back to "none" after 3 seconds
          element.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds
      });
    });
});

document.getElementById("reportIssue").addEventListener("click", function () {
  chrome.tabs.create({
    url: "https://github.com/ldehner/NotionOpsCrawler/issues/new/choose",
  });
});

document
  .getElementById("installExtension")
  .addEventListener("click", function () {
    chrome.tabs.create({
      url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#after-installing-the-extension",
    });
  });

document.getElementById("useExtension").addEventListener("click", function () {
  chrome.tabs.create({
    url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#how-to-use-the-extension",
  });
});

document.getElementById("getDatabaseId").addEventListener("click", function () {
  chrome.tabs.create({
    url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#how-do-i-get-my-database-id",
  });
});

document.getElementById("databaseLook").addEventListener("click", function () {
  chrome.tabs.create({
    url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#what-should-my-database-look-like",
  });
});

document
  .getElementById("createIntegration")
  .addEventListener("click", function () {
    chrome.tabs.create({
      url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#how-to-create-a-notion-integration",
    });
  });

document.getElementById("getApiKey").addEventListener("click", function () {
  chrome.tabs.create({
    url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#how-to-get-the-api-key",
  });
});

document
  .getElementById("addIntegration")
  .addEventListener("click", function () {
    chrome.tabs.create({
      url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#how-can-i-add-my-notion-integration-to-my-database",
    });
  });

document.getElementById("extractDevOps").addEventListener("click", function () {
  chrome.tabs.create({
    url: "https://github.com/ldehner/NotionOpsCrawler/blob/main/README.md#what-parts-of-devops-can-i-currently-extract",
  });
});
