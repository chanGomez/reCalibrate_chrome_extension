//Establishing connection with current tab
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
//-------------------
//Example code that shows how to detach the chrome extension
//if there is already one active on tab  
//-------------------

// chrome.debugger.getTargets((targets) => {
//   const tabDebugger = targets.find((target) => target.tabId === tab.id);
//   if (tabDebugger) {
//     chrome.debugger.detach({ tabId: tab.id }, () => {
//       // Now reattach the debugger
//       chrome.debugger.attach({ tabId: tab.id }, "1.2", () => {
//         console.log("Debugger attached");
//       });
//     });
//   } else {
//     // Attach the debugger since no other debugger is attached
//     chrome.debugger.attach({ tabId: tab.id }, "1.2", () => {
//       console.log("Debugger attached");
//     });
//   }
// });

//Retrieving Devtool info

