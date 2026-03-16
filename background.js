var separator = "] "
var total = 0
var enabled = true
var pendingRemovedId = undefined

const executeScript = chrome.scripting
  ? (tabId, func, args) => chrome.scripting.executeScript({ target: { tabId }, func, args })
  : (tabId, func, args) => chrome.tabs.executeScript(tabId, { code: `(${func})(${args.map(JSON.stringify).join(',')})` })

const initPromise = new Promise(resolve => {
  chrome.storage.local.get("enabled", (result) => {
    if (result.enabled !== undefined) enabled = result.enabled
    resolve()
  })
})

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

function tabs(removedTabId) {
  if (removedTabId !== undefined) pendingRemovedId = removedTabId
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabList) {
    const removed = pendingRemovedId !== undefined ? tabList.find(t => t.id === pendingRemovedId) : null
    if (removed) {
      tabList = tabList
        .filter(t => t.id !== pendingRemovedId)
        .map(t => t.index > removed.index ? {...t, index: t.index - 1} : t)
    } else {
      pendingRemovedId = undefined
    }
    total = tabList.length
    for (var i = 0; i < tabList.length; i++) {
      const tab = tabList[i]
      if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://") || tab.url.startsWith("about:")) continue
      const newTitle = indexTitle(tab.index, tab.title, total)
      executeScript(tab.id, (title) => { document.title = title }, [newTitle])
    }
  })
}

function callbackTab(tab, action){
    initPromise.then(() => {
        if(enabled){
            tabs(action === "removed" ? tab : undefined)
        }
    })
}

chrome.commands.onCommand.addListener(function(command) {
  enabled = !enabled;
  chrome.storage.local.set({ enabled })
  tabs()
})

chrome.tabs.onUpdated.addListener((tab) => callbackTab(tab, "updated"));

chrome.tabs.onActivated.addListener((tab) => callbackTab(tab, "activated"));

chrome.tabs.onRemoved.addListener((tab) => callbackTab(tab, "removed"));

chrome.tabs.onMoved.addListener((tab) => callbackTab(tab, "moved"));
