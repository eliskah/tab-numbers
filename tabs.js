tabs();
chrome.tabs.onCreated.addListener(function(tab) { tabs(); })
chrome.tabs.onRemoved.addListener(function(tab) { tabs(); })

function tabs() {
  var openTabs = [];
    console.log("fetching tabs");

    chrome.tabs.query({windowId: -2}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        openTabs[i] = tabs[i];
      }
      for (var i = 0; i < openTabs.length; i++) {
        if (openTabs[i] != null)
          console.log(openTabs[i])
        else {
          console.log("??" + i);
        }
      }
    });
  }

function changeTitle(tab, index) {
  chrome.tabs.executeScript({
      code: 'document.title=index + "] " + document.title'
    });
}
