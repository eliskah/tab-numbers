var separator = "] "

function indexTitle(tab) {

  var index = tab.index
  var title = tab.title
  var start = title.indexOf(separator) > -1 ? (title.indexOf(separator) + separator.length) : -1
  var originalTitle = title.substring(start)

  if (start != -1) { return originalTitle}
  if (index > 8) { return "...".concat(separator, title) }

  return "".concat((index+1).toString(), separator, originalTitle)
}

function tabs() {

  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {

    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i] != null)
        chrome.tabs.executeScript(tabs[i].id, { file: 'fetch_title.js' }, function(response, i) {
          chrome.runtime.onMessage.addListener(function(document, i) {
            chrome.tabs.executeScript(i.tab.id, { code: "document.title=".concat('"', indexTitle(i.tab), '"') } )
          })
        })
    }
  })
}

chrome.commands.onCommand.addListener(function(command) { tabs() })