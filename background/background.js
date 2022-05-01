const keys = {  //patterns that match cookie vendors network requests
  "cookiebot" : ["https://consent.cookiebot.com/uc.js",
  "https://consent.cookiebot.eu/*/cc.js?*"],
  "didomi" : ["https://sdk.privacy-center.org/loader.js?*",
  "https://sdk.privacy-center.org/*/loader.js?*"]
}

function matching(vendor, pattern){

    function send(tabId){
      browser.tabs.onUpdated.removeListener(send)
      browser.tabs.sendMessage(tabId, vendor)
    }

    function whichVendor (){
      //browser.webRequest.onBeforeRequest.removeListener(whichVendor)  //fa que al recarregar la pàgina no envii les dades al content script. Millor desactivat
      browser.tabs.onUpdated.addListener(send)
    }

    browser.webRequest.onBeforeRequest.addListener(
      whichVendor,  //if matches the pattern send to content script the vendor
        {
            urls: pattern,
        }
    )
}
for (const vendor of Object.keys(keys)) {
  matching(vendor, keys[vendor]); //try for each vendor
}