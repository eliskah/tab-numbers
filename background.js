var separator = "] "
var total = 0

function indexTitle(tab, max) {

  var index = tab.index
  var title = tab.title
  var start = title.indexOf(separator) > -1 ? (title.indexOf(separator) + separator.length) : -1
  var originalTitle = title.substring(start)

  if (start != -1) { return originalTitle}
    else if (index > 7 && index == max-1) { return "9".concat(separator, title) }
    else if (index > 7) { return "...".concat(separator, title) }
    else {return "".concat((index+1).toString(), separator, originalTitle)}
}

function tabs() {
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
    total = tabs.length
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.lastIndexOf("chrome://") != 0) {
        chrome.tabs.executeScript(tabs[i].id, { code: chrome.runtime.sendMessage({'title': document.title, 'tab': tabs[i]}) })
      }
    }
  })
}

chrome.commands.onCommand.addListener(function(command) { tabs() })
chrome.runtime.onMessage.addListener(function(message, sender) {
  chrome.tabs.executeScript(message.tab.id, { code: "document.title=".concat('"', indexTitle(message.tab, total), '"') } )
})
