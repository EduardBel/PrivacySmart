const keys = {  //patterns that match cookie vendors network requests
  "cookiebot" : ["https://consent.cookiebot.com/uc.js",
  "https://consent.cookiebot.eu/*/cc.js?*"],
  "didomi" : ["https://sdk.privacy-center.org/loader.js?*",
  "https://sdk.privacy-center.org/*/loader.js?*"]
}

function matching(vendor, pattern){

    function send(tabId){
      browser.tabs.onUpdated.removeListener(send)
      browser.tabs.onActivated.removeListener(send)
      browser.tabs.onCreated.removeListener(send)
      "use strict";
      
      browser.tabs.sendMessage(
        tabId,
        vendor
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response.response);
      }).catch(onError);
    }

    function whichVendor (){
      //browser.webRequest.onBeforeRequest.removeListener(whichVendor)  //fa que al recarregar la pàgina no envii les dades al content script. Millor desactivat
      browser.tabs.onUpdated.addListener(send)
      browser.tabs.onActivated.addListener(send)
      browser.tabs.onCreated.addListener(send)
    }

    browser.webRequest.onBeforeRequest.addListener(
      whichVendor,  //if matches the pattern send to content script the vendor
        {
            urls: pattern,
        }
    )
}

function tryVendors(){
  for (const vendor of Object.keys(keys)) {
    matching(vendor, keys[vendor]); //try for each vendor
  }
}
browser.tabs.onCreated.addListener(tryVendors)