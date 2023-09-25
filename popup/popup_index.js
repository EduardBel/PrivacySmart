function listenForClicks() {
  document.addEventListener("click", (e) => {
    function clica(){
        let preferencies=document.getElementById("preferencies").value;
        if(preferencies!='')browser.storage.local.set({"preferencies": preferencies})
    }
    function consulta(){
      var x = document.getElementById("contingut"); //amaguem contingut i mostrem la llista de transaccions //FALTA QUE ES PUGUI COPIAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      x.style.display = "none";
      var y = document.getElementById("transaccions");
      y.style.display = "block"; 
      browser.storage.local.get(['webPagesTFG'], function(result) { // mostrem llista
        browser.storage.local.get(['transactionIDsTFG'], function(result2) {
          var llista = document.getElementById("llista_consent")
          for(i in result.webPagesTFG){
            llista.innerHTML=llista.innerHTML + "<li>" +
            result.webPagesTFG[i] +
            " : <input type='text' value='" + result2.transactionIDsTFG[i] +
            "'><button id='info' class='info_button info'>+ Info</button></li>"
          
          }       
        });
      });
    }
    function torna(){ // amaguem transaccions i mostrem contingut principal
      var x = document.getElementById("contingut");
      x.style.display = "block";
      var y = document.getElementById("transaccions");
      y.style.display = "none";
      var llista = document.getElementById("llista_consent")
      llista.innerHTML=""//buidem llista consentiments  
      var z = document.getElementById("claus");
      z.style.display = "none";
    }
    function transaction(){ // mostrem contingut
      // let trans=document.getElementById("IDTransaccio").value
      // if(trans!=''){  //si esta correcte
      //   var llista = document.getElementById("consultaTransaccio")
      //   llista.innerHTML=""//buidem consentiment donat a la transaccio concreta 
      //   var url = 'HTTP://127.0.0.1:7545' // 8545 if using ganache-cli // 192.168.10.7 es la IP de la VM BlockChain
      //   web3 = new Web3(url)  // ens connectem a Ganache
      //   let abi = '[{"inputs":[{"internalType":"uint8","name":"_val","type":"uint8"},{"internalType":"string","name":"_s","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"whichPreference","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whichWeb","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
      //   var notorizedContract=new web3.eth.Contract(JSON.parse(abi))
        
      //   try{
      //     notorizedContract.options.address=trans
      //     notorizedContract.methods.whichPreference().call() // imprimim el paràmetre que hi ha dins de l'SC
      //     .then(pref => { console.log("La preferencia era: "+pref)
      //                     llista.innerHTML=llista.innerHTML + "<span class: 'field in'>the given consent was: "+pref+"</span>"
      //                     var x = document.getElementById("consultaTransaccio");
      //                     x.style.display = "block";
      //     });
      // }catch(e){var llista = document.getElementById("consultaTransaccio")
      //           llista.innerHTML=llista.innerHTML + "<span class: 'field in'>There has been an error: "+e+"</span>"
      //           var x = document.getElementById("consultaTransaccio");
      //           x.style.display = "block";}
      // }

      var x = document.getElementById("contingut");
      x.style.display = "none";
      var y = document.getElementById("claus");
      y.style.display = "block";

     
    }
    function save_keys(){
      let wallet=document.getElementById("wallet").value; //prenem el contingut del camp de text de wallet introduit
      //let IDTransaccio=document.getElementById("IDTransaccio").value;
      let publica=document.getElementById("publica").value;
      let mnemonic=document.getElementById("mnemonic").value;

      if(wallet!=''){ 
        browser.storage.local.get(['wallet']).then(
          res =>{ oldWallet=res.wallet
                  if(wallet!==oldWallet){ //si s'ha canviat la wallet
                    let webPagesTFG = new Array(); // buidem les llistes de consentiment
                    let transactionIDsTFG = new Array();
                    browser.storage.local.set({"webPagesTFG": webPagesTFG})
                    browser.storage.local.set({"transactionIDsTFG": transactionIDsTFG}) 
                    browser.storage.local.set({"wallet": wallet})  // actualitzem la wallet
                  }
          });           
      } 
      if(publica!=''){ 
        browser.storage.local.get(['publica']).then(
          res =>{ oldPublica=res.publica
                  if(publica!==oldPublica){ //si s'ha canviat la wallet
                    browser.storage.local.set({"publica": publica})  // actualitzem la wallet
                    var publicKeyStatus = document.getElementById("publicKeyStatus");
                    publicKeyStatus.textContent = "Public key: "+ publica;
                  }
          });


                   
      } 
      if(mnemonic!=''){ 
        browser.storage.local.get(['mnemonic']).then(
          res =>{ oldMnemonic=res.mnemonic
                  if(mnemonic!==oldMnemonic){ //si s'ha canviat la wallet
                    browser.storage.local.set({"mnemonic": mnemonic})  // actualitzem la wallet
                  }
          });           
      } 
    }
    if (e.target.classList.contains("aplica")) {  //si el que s'ha clicat és el botó d'aplicar cridem la funció
      browser.tabs.query({active: true, currentWindow: true})
        .then(clica)
    }
    if (e.target.classList.contains("consulta")) {  //si el que s'ha clicat és el botó de consultar cridem la funció
      browser.tabs.query({active: true, currentWindow: true})
        .then(consulta)
    }
    if (e.target.classList.contains("torna")) {  //si el que s'ha clicat és el botó de consultar cridem la funció
      browser.tabs.query({active: true, currentWindow: true})
        .then(torna)
    }
    if (e.target.classList.contains("transaction")) {  //si el que s'ha clicat és el botó de consultar cridem la funció
      browser.tabs.query({active: true, currentWindow: true})
        .then(transaction)
    }
    if (e.target.classList.contains("save_keys")) {  //si el que s'ha clicat és el botó de consultar cridem la funció
      browser.tabs.query({active: true, currentWindow: true})
        .then(save_keys)
    }
  });
}

browser.storage.local.get(['wallet'], function(result) {  //comprovem al storage si s'ha creat la parella clau-valor de wallet
  if (typeof(result.wallet) != "undefined")document.getElementById("wallet").value = result.wallet; //en cas que si, introduim el valor dins el camp de text
});
browser.storage.local.get(['publica'], function(result) {  //comprovem al storage si s'ha creat la parella clau-valor de wallet
  if (typeof(result.publica) != "undefined"){
    document.getElementById("publica").value = result.publica; //en cas que si, introduim el valor dins el camp de text
    var publicKeyStatus = document.getElementById("publicKeyStatus");
    publicKeyStatus.textContent = "Public key: "+ result.publica;
  }
});
browser.storage.local.get(['mnemonic'], function(result) {  //comprovem al storage si s'ha creat la parella clau-valor de wallet
  if (typeof(result.mnemonic) != "undefined")document.getElementById("mnemonic").value = result.mnemonic; //en cas que si, introduim el valor dins el camp de text
});
browser.storage.local.get(['preferencies'], function(result) {
  if (typeof(result.preferencies) != "undefined")document.getElementById("preferencies").value = result.preferencies;
});
  
listenForClicks()
