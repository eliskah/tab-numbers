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

function isValid(url) {
  valid = true
  prefixes = ["chrome://", "about:", "view-source:"]
  for (var i = 0; i < prefixes.length; i++) 
    { if (url.lastIndexOf(prefixes[i]) == 0) {
        valid = false 
      }
    }
  return valid
}

function tabs() {
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
    total = tabs.length
    for (var i = 0; i < tabs.length; i++) {
      //if (isValid(tabs[i].url)) {
     chrome.tabs.executeScript(tabs[i].id, 
         { code: "chrome.runtime.sendMessage({'index': ".concat(tabs[i].index, 
             ", 'id': ", 
             tabs[i].id, 
             ", 'title': '", 
             tabs[i].title, 
             "' })") })
      //}
    }
  }
)}

chrome.commands.onCommand.addListener(function(command) { 
  enabled = true
  tabs()
})
chrome.tabs.onActivated.addListener(function(tab) { 
  if (enabled) {
    enabled = true
    tabs()
  }
})
chrome.runtime.onMessage.addListener(function(message, sender) {
  chrome.tabs.executeScript(message.id, { code: "document.title=".concat('"', indexTitle(message.index, message.title, total), '"') } )
})
