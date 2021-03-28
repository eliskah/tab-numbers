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
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
    total = tabs.length
    for (var i = 0; i < tabs.length; i++) {
     chrome.tabs.executeScript(tabs[i].id, 
         { code: "chrome.runtime.sendMessage({'index': ".concat(tabs[i].index, 
             ", 'id': ", 
             tabs[i].id, 
             ", 'title': '", 
             tabs[i].title, 
             "' })") })
    }
  }
)}

function callbackTab(tab){
    if(enabled){
        enabled = true;
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



chrome.runtime.onMessage.addListener(function(message, sender) {
  chrome.tabs.executeScript(message.id, { code: "document.title=".concat('"', indexTitle(message.index, message.title, total), '"') } )
})
