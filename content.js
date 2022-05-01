/*function ConnectREST(url){  //ja innecessària
    var data = {username: 'example'};
     fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!  headers:{
        'Content-Type': 'application/json'
      }
    ).then(res => res.text())
    .then((res) => {
        console.log(res)
    })
    .catch(error => console.error('Error:', error))
}
*/
//ConnectREST('http://192.168.10.6:3000/test'); //direcció wallet
//ConnectREST('http://192.168.10.7:3000/test'); //direcció BC
//const { createSecureContext } = require('tls')
/*async function ComencaSC() { //funcio totalment innecessaria
  var llista = await web3.eth.getAccounts() //agafem les direccions que ha generat Ganache
  creaSC(llista[0])
}*/


function manageCookies(){  //detecció banner cookies
  var banner =document.getElementById('aviso-cookies');   //aqui podriem posar el nom del banner que podem trobar a les llistes que hem vist a la docu(en forma de variable)
  var buttons = banner.getElementsByTagName('button');    //busquem els botons que hi ha dins el banner
  
  for (var i = 0, len = buttons.length; i < len; ++i) {
      //console.log(buttons[i].id)
      //estaria be mirar aqui quin botó pot ser el d'acceptar/ rebutjar/configurar.
      // de moment com sols hi ha el d'acceptar a la web cutre el poso a una variable directament
      boto_acceptar_web_test = buttons[0].id  // ens quedem amb el boto d'acceptar
  }

  var button = document.getElementById(boto_acceptar_web_test);
  let estat=false
  if(document.cookie.length==0){  //en cas que no hi hagi cookies desades
    button.click()  //cliquem el boto
    console.log("Info Plugin Eduard: hem acceptat les cookies per tu")
    estat=true
  } 
  else estat=false
  return estat
}


function creaSC(ac){  //genera SC i fa deploy
  console.log("Accedint als documents de SC...")
  // documents de l'SC
  let abi = '[{"inputs":[{"internalType":"uint8","name":"_val","type":"uint8"},{"internalType":"string","name":"_s","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"whichWeb","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
  let bytecode = '608060405234801561001057600080fd5b506040516105c23803806105c283398181016040528101906100329190610192565b816000806101000a81548160ff021916908360ff160217905550806001908051906020019061006292919061006a565b505050610381565b82805461007690610284565b90600052602060002090601f01602090048101928261009857600085556100df565b82601f106100b157805160ff19168380011785556100df565b828001600101855582156100df579182015b828111156100de5782518255916020019190600101906100c3565b5b5090506100ec91906100f0565b5090565b5b808211156101095760008160009055506001016100f1565b5090565b600061012061011b84610213565b6101ee565b90508281526020810184848401111561013c5761013b61034a565b5b610147848285610251565b509392505050565b600082601f83011261016457610163610345565b5b815161017484826020860161010d565b91505092915050565b60008151905061018c8161036a565b92915050565b600080604083850312156101a9576101a8610354565b5b60006101b78582860161017d565b925050602083015167ffffffffffffffff8111156101d8576101d761034f565b5b6101e48582860161014f565b9150509250929050565b60006101f8610209565b905061020482826102b6565b919050565b6000604051905090565b600067ffffffffffffffff82111561022e5761022d610316565b5b61023782610359565b9050602081019050919050565b600060ff82169050919050565b60005b8381101561026f578082015181840152602081019050610254565b8381111561027e576000848401525b50505050565b6000600282049050600182168061029c57607f821691505b602082108114156102b0576102af6102e7565b5b50919050565b6102bf82610359565b810181811067ffffffffffffffff821117156102de576102dd610316565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61037381610244565b811461037e57600080fd5b50565b610232806103906000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806382e9aa0714610030575b600080fd5b61003861004e565b6040516100459190610119565b60405180910390f35b60606001805461005d9061018a565b80601f01602080910402602001604051908101604052809291908181526020018280546100899061018a565b80156100d65780601f106100ab576101008083540402835291602001916100d6565b820191906000526020600020905b8154815290600101906020018083116100b957829003601f168201915b5050505050905090565b60006100eb8261013b565b6100f58185610146565b9350610105818560208601610157565b61010e816101eb565b840191505092915050565b6000602082019050818103600083015261013381846100e0565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561017557808201518184015260208101905061015a565b83811115610184576000848401525b50505050565b600060028204905060018216806101a257607f821691505b602082108114156101b6576101b56101bc565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea2646970667358221220b834e4b4b00116e7b0d7e921bc9f427101cb9110d0c3f505e2d7467eba654f1664736f6c63430008070033'
  
  console.log("S'ha accedit als documents!")
  //crea instancia de SC
  var notorizedContract=new web3.eth.Contract(JSON.parse(abi))
  notorizedContract.deploy({data:bytecode, arguments:[1,window.location.href]}) //fa deploy amb les dades
  .send({
    from:ac,
    gas:1500000, 
    gasPrice:web3.utils.toWei('0.00003', 'ether')})
  .then((newContractInstance) => {
    notorizedContract.options.address=newContractInstance.options.address //guardem l'adreça de l'SC
    notorizedContract.methods.whichWeb().call() // imprimim el paràmetre que hi ha dins de l'SC
    .then(webSC => console.log("Info Plugin Eduard: hem creat un SC per les cookies d'aquesta web: "+webSC));
  });
}


function comprovaWallet(wallet){
  if(typeof(wallet)!="undefined"){
    browser.storage.local.get(['preferencies']).then( //prenem el valor de preferències introduit per l'user
        res =>{ preferencies=res.preferencies,
          preferencies=parseInt(preferencies, 10);
          if(preferencies>0 && preferencies<5){
            if(manageCookies()){ //si s'ha pogut dur a terme l'acció, crea un SC
              creaSC(wallet) 
            }
          } 
          else console.log("Info Plugin Eduard: si vols que el plugin gestioni les teves cookies has d'introduïr el nivell de preferències al pop-up!")                       
        }); 
    
  }
  else console.log("Info Plugin Eduard: si vols que el plugin gestioni les teves cookies has d'introduïr l'adreça de la teva Wallet al pop-up!")
}


function gotCookies(vendor){
  console.log("ha entrat bc "+vendor)
  var wallet; 
  Web3 = require('web3')
  var url = 'HTTP://192.168.10.7:8545' // 8545 if using ganache-cli // 192.168.10.7 es la IP de la VM BlockChain
  web3 = new Web3(url)  // ens connectem a Ganache
  browser.storage.local.get(['wallet']).then(
    res =>{ wallet=res.wallet,
      comprovaWallet(wallet)  // ho fem aixi per tenir certesa de que la funcio rebrà wallet amb el valor que toca.                            
    });                       // si ho fem a una instrucció fora d'aquest "scope" no sabem si hauà carregat el valor a temps
}


function testForCookies(request, sender, sendResponse) {
  if (request) {
    console.log("Info plugin Eduard: "+request)
    browser.runtime.onMessage.removeListener(testForCookies);
    gotCookies(request)
  } 
}

//Inici del "main"
browser.runtime.onMessage.addListener(testForCookies);
                    



/*browser.storage.local.get(['keystore'], function(result) {
  console.log("Keystore: "+result.keystore)
});
*/


//per més tard. Detecta l'element de la web que està més al davant de tots(cookie banner)
/*
function maximoZindex(){
    var max = 0;
    let from = document.body.innerHTML//$("body")
    console.log(from)
    from.find(">*").each(function(i, e){    //bucle que busca el final de cada tag
        console.log("test")
      var z = Number($(e).css("z-index"));
      if(z > max) {
        max = z;
      }
    });
    console.log(max)
    return max;
  }
  
  console.log("maximo z-index a partir de body", maximoZindex());

*/