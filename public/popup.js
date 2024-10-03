document.getElementById("debug-button").addEventListener("click", function () {
  // Query for the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // 'tabs' is an array, we want the first one which is the active tab
    const tab = tabs[0];

    if (tab.url.startsWith("http")) {
      console.log("Attempting to attach debugger...");

      // Attach the debugger to the tab
      chrome.debugger.attach({ tabId: tab.id }, "1.2", function () {
        if (chrome.runtime.lastError) {
          console.error(
            "Debugger attach failed:",
            chrome.runtime.lastError.message
          );
        } else {
          console.log("Debugger attached successfully!");

          // Enable network monitoring
          chrome.debugger.sendCommand(
            { tabId: tab.id },
            "Network.enable",
            {},
            function () {
              if (chrome.runtime.lastError) {
                console.error(
                  "Failed to enable network monitoring:",
                  chrome.runtime.lastError.message
                );
              } else {
                console.log("Network monitoring enabled!");
              }
            }
          );
        }
      });
    } else {
      console.log("Can only attach debugger to HTTP/HTTPS pages.");
    }
  });
});


// document.getElementById("debug-button").addEventListener("click", function () {
//   // Get the current tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const tab = tabs[0];

//     // Check if the URL is HTTP/HTTPS
//     if (tab.url.startsWith("http")) {
//       // Attach the debugger
//       chrome.debugger.attach({ tabId: tab.id }, "1.2", function () {
//         if (chrome.runtime.lastError) {
//           console.error(
//             "Debugger attach failed:",
//             chrome.runtime.lastError.message
//           );
//           return;
//         }

//         // Enable the Network domain to log network activity
//         chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");

//         // Listen for debugger events
//         chrome.debugger.onEvent.addListener(function (source, method, params) {
//           if (method === "Network.responseReceived") {
//             console.log("Network response:", params.response);
//           }
//         });
//       });
//     } else {
//       console.log("Can only attach debugger to HTTP/HTTPS pages.");
//     }
//   });
// });
