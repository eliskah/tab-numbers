var separator = "] "

function renderTitle(title, index) {
  var start = title.indexOf(separator) > -1 ? (title.indexOf(separator) + separator.length) : -1

  return "".concat((index+1).toString(), separator, title.substring(start))
}

function tabs() {
  var openTabs = [];
  console.log("fetching tabs");

  chrome.tabs.query({windowId: -2}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      openTabs[i] = tabs[i];
    }
    for (var i = 0; i < openTabs.length; i++) {
      if (openTabs[i] != null)
        chrome.tabs.executeScript(openTabs[i].id, { file: 'content.js' }, function(response, i) {
          chrome.runtime.onMessage.addListener(function(document, i) {
            var title = "document.title=".concat('"', renderTitle(i.tab.title, i.tab.index), '"')
            chrome.tabs.executeScript(i.tab.id, { code: title } )
          })
        })
    }
  })
}

chrome.commands.onCommand.addListener(function(command) { tabs() })
chrome.tabs.onCreated.addListener(function(tab) { tabs(); })
chrome.tabs.onRemoved.addListener(function(tab) { tabs(); })