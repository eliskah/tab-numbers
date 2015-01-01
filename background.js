var separator = "] "

function renderTitle(tab) {
  var title = tab.title
  var index = tab.index + 1   // Because you need to press 1 for first page in Chrome UI
  var start = title.indexOf(separator) > -1 ? (title.indexOf(separator) + separator.length) : -1

  return "".concat(index.toString(), separator, title.substring(start))
}

chrome.commands.onCommand.addListener(function(command){
  chrome.tabs.query({windowId: -2, highlighted: true}, function(tabs) {
    var tab = tabs[0]
    chrome.tabs.executeScript({ code: "document.title=".concat('"',renderTitle(tab),'"')})
  })
})