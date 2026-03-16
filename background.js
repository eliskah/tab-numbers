var separator = "] "
var total = 0
var enabled = true

function indexTitle(index, title, max) {

  var start = title.indexOf(separator) > -1 ? (title.indexOf(separator) + separator.length) : -1
  var originalTitle = title.substring(start)

  if (enabled == false) { return originalTitle }

    if (index > 7 && index == max-1) {
        return "".concat("9".toString(), separator, originalTitle)
    }
    else if (index > 7) {
        if(title[0] === "9" && title[1] === "]"){
            return title.substring(2);
        } else{
            return title;
        }
    }
    else {
        return "".concat((index+1).toString(), separator, originalTitle)
    }
}

function tabs() {
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabList) {
    total = tabList.length
    for (var i = 0; i < tabList.length; i++) {
      const tab = tabList[i]
      if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://") || tab.url.startsWith("about:")) continue
      const newTitle = indexTitle(tab.index, tab.title, total)
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (title) => { document.title = title },
        args: [newTitle]
      })
    }
  })
}

function callbackTab(tab){
    if(enabled){
        tabs()
    }
}

chrome.commands.onCommand.addListener(function(command) {
  enabled = enabled ? false : true;
  tabs()
})

chrome.tabs.onUpdated.addListener((tab) => callbackTab(tab));

chrome.tabs.onActivated.addListener((tab) => callbackTab(tab));

chrome.tabs.onRemoved.addListener((tab) => callbackTab(tab));

chrome.tabs.onMoved.addListener((tab) => callbackTab(tab));
