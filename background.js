var separator = "] "

function indexTitle(tab) {
  var index = tab.index
  var title = tab.title
  var start = title.indexOf(separator) > -1 ? (title.indexOf(separator) + separator.length) : -1
  
  if (index > 8) { return "...".concat(separator, title) }
  return "".concat((index+1).toString(), separator, title.substring(start))

}

function tabs() {

  chrome.tabs.query({windowId: -2}, function(tabs) {

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