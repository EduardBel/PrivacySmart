async function manageCookies(vendor){  //detecció banner cookies
  switch(vendor){
    case "CookieBot": return await cookiebot(preferencies)
    break;
    case "Didomi": return await didomi(preferencies);
    break;
    case "CookieYes": return await cookieyes(preferencies)                 
    break;
    case "CookieNotice": return await cookienotice(preferencies);
    break;
    case "OneTrust": return await onetrust(preferencies);
    break;
    default: console.log("Info Plugin Eduard: No és cap vendor controlat")
              return 0
    break;
  }
}

async function creaSC(ac){  //genera SC i fa deploy
  console.log("Info Plugin Eduard: Accedint als documents de SC...")
  // documents de l'SC
  let abi = '[{"inputs":[{"internalType":"uint8","name":"_val","type":"uint8"},{"internalType":"string","name":"_s","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"whichPreference","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whichWeb","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
  let bytecode = '608060405234801561001057600080fd5b5060405161063838038061063883398181016040528101906100329190610192565b816000806101000a81548160ff021916908360ff160217905550806001908051906020019061006292919061006a565b505050610381565b82805461007690610284565b90600052602060002090601f01602090048101928261009857600085556100df565b82601f106100b157805160ff19168380011785556100df565b828001600101855582156100df579182015b828111156100de5782518255916020019190600101906100c3565b5b5090506100ec91906100f0565b5090565b5b808211156101095760008160009055506001016100f1565b5090565b600061012061011b84610213565b6101ee565b90508281526020810184848401111561013c5761013b61034a565b5b610147848285610251565b509392505050565b600082601f83011261016457610163610345565b5b815161017484826020860161010d565b91505092915050565b60008151905061018c8161036a565b92915050565b600080604083850312156101a9576101a8610354565b5b60006101b78582860161017d565b925050602083015167ffffffffffffffff8111156101d8576101d761034f565b5b6101e48582860161014f565b9150509250929050565b60006101f8610209565b905061020482826102b6565b919050565b6000604051905090565b600067ffffffffffffffff82111561022e5761022d610316565b5b61023782610359565b9050602081019050919050565b600060ff82169050919050565b60005b8381101561026f578082015181840152602081019050610254565b8381111561027e576000848401525b50505050565b6000600282049050600182168061029c57607f821691505b602082108114156102b0576102af6102e7565b5b50919050565b6102bf82610359565b810181811067ffffffffffffffff821117156102de576102dd610316565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61037381610244565b811461037e57600080fd5b50565b6102a8806103906000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806372264e0b1461003b57806382e9aa0714610059575b600080fd5b610043610077565b6040516100509190610189565b60405180910390f35b61006161008d565b60405161006e9190610167565b60405180910390f35b60008060009054906101000a900460ff16905090565b60606001805461009c90610200565b80601f01602080910402602001604051908101604052809291908181526020018280546100c890610200565b80156101155780601f106100ea57610100808354040283529160200191610115565b820191906000526020600020905b8154815290600101906020018083116100f857829003601f168201915b5050505050905090565b600061012a826101a4565b61013481856101af565b93506101448185602086016101cd565b61014d81610261565b840191505092915050565b610161816101c0565b82525050565b60006020820190508181036000830152610181818461011f565b905092915050565b600060208201905061019e6000830184610158565b92915050565b600081519050919050565b600082825260208201905092915050565b600060ff82169050919050565b60005b838110156101eb5780820151818401526020810190506101d0565b838111156101fa576000848401525b50505050565b6000600282049050600182168061021857607f821691505b6020821081141561022c5761022b610232565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea264697066735822122019eb9b828496ddec92718450d1895fd43385024f4470be4c75d04ce644d0c8b864736f6c63430008070033'
  
  console.log("Info Plugin Eduard: S'ha accedit als documents!")
  //crea instancia de SC
  var notorizedContract=new web3.eth.Contract(JSON.parse(abi))

  console.log("Info Plugin Eduard: Estimant cost de la transacció")
  const estimatedGas = await notorizedContract.deploy(({data:bytecode, arguments:[preferencies,window.location.href]})).estimateGas();
  console.log("Info Plugin Eduard: El gas estimat és "+estimatedGas)
  notorizedContract.deploy({data:bytecode, arguments:[preferencies,window.location.href]}) //fa deploy amb les dades
  .send({
    from:ac,
    gas:estimatedGas, 
  })
    .then((newContractInstance) => {
      console.log("Info Plugin Eduard: Transacció exitosa!")
      notorizedContract.options.address=newContractInstance.options.address
      browser.storage.local.get(['transactionIDsTFG']).then(  //actualitzem les llistes de contractes
        res =>{ trActual=res.transactionIDsTFG,
                trActual.push(notorizedContract.options.address) 
                browser.storage.local.set({"transactionIDsTFG": trActual})
        });
        browser.storage.local.get(['webPagesTFG']).then(
          res =>{ webActual=res.webPagesTFG,
                  webActual.push(window.location.href) 
                  browser.storage.local.set({"webPagesTFG": webActual})
          });
  });
}


async function comprovaWallet(wallet,vendor){
  if(typeof(wallet)!="undefined"){
    browser.storage.local.get(['preferencies']).then( //prenem el valor de preferències introduit per l'user
        async res =>{ preferencies=res.preferencies
          preferencies=parseInt(preferencies, 10);
          if(preferencies>0 && preferencies<5){
            await manageCookies(vendor).then(async ret =>{ //si s'ha pogut dur a terme l'acció, crea un SC
              if(ret==1)creaSC(wallet) 
            })
          } 
          else console.log("Info Plugin Eduard: si vols que el plugin gestioni les teves cookies has d'introduïr el nivell de preferències al pop-up!")                       
        }); 
  }
  else console.log("Info Plugin Eduard: si vols que el plugin gestioni les teves cookies has d'introduïr l'adreça de la teva Wallet al pop-up!")
}


function gotCookies(vendor){
  var wallet; 
  var url = 'HTTP://192.168.10.7:7545' // 8545 if using ganache-cli // 192.168.10.7 es la IP de la VM BlockChain
  web3 = new Web3(url)  // ens connectem a Ganache
  browser.storage.local.get(['wallet']).then(
    res =>{ wallet=res.wallet,
      comprovaWallet(wallet,vendor)  // ho fem aixi per tenir certesa de que la funcio rebrà wallet amb el valor que toca.                            
    });                       // si ho fem a una instrucció fora d'aquest "scope" no sabem si hauà carregat el valor a temps
}


const list = {  //patterns that match cookie vendors network requests
  "CookieBot" : ["#CybotCookiebotDialogBody"],
  "Didomi" : ["#didomi-host"],
  "CookieYes" : ["#cookie-law-info-bar"],
  "CookieNotice" : ["#cookie-notice"],
  "OneTrust" : ["#onetrust-banner-sdk"]
}


async function waitForBanner() {
  await waitForAny(list).then((successMessage) => {
    console.log("Info plugin Eduard: hem trobat un banner de " + successMessage);
    gotCookies(successMessage)
  });

}
//Inici del "main"
waitForBanner();