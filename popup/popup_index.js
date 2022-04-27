function listenForClicks() {
  document.addEventListener("click", (e) => {
    function clica(){
        let wallet=document.getElementById("wallet").value; //prenem el contingut del camp de text de wallet introduit
        let keystore=document.getElementById("keystore").value;
        let preferencies=document.getElementById("preferencies").value;
        if(wallet!='') browser.storage.local.set({"wallet": wallet})  // en cas que hagi introduit el que sigui, creem la parella clau-valor al storage. 
        if(keystore!='')browser.storage.local.set({"keystore": keystore}) // Si ja existia la clau "wallet" se li canviarà el valor
        if(preferencies!='')browser.storage.local.set({"preferencies": preferencies})
    }
    if (e.target.classList.contains("aplica")) {  //si el que s'ha clicat és el botó d'aplicar cridem la funció
      browser.tabs.query({active: true, currentWindow: true})
        .then(clica)
        .catch(reportError);
    }
  });
}

browser.storage.local.get(['wallet'], function(result) {  //comprovem al storage si s'ha creat la parella clau-valor de wallet
  if (typeof(result.wallet) != "undefined")document.getElementById("wallet").value = result.wallet; //en cas que si, introduim el valor dins el camp de text
});
browser.storage.local.get(['keystore'], function(result) {
  if (typeof(result.keystore) != "undefined")document.getElementById("keystore").value = result.keystore;
});
browser.storage.local.get(['preferencies'], function(result) {
  if (typeof(result.preferencies) != "undefined")document.getElementById("preferencies").value = result.preferencies;
});
  
listenForClicks()
