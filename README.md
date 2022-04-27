# TFGPlugin
Mozilla Firefox extension that lets you choose your preferences about web cookies in order to save you some time.
## Pre-requisites

* [Ganache](https://www.trufflesuite.com/ganache): Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.
* [Web3js](https://web3js.readthedocs.io/en/v1.7.3/index.html): JavaScript API to communicate with the Blockchain.
* [Browserify](https://browserify.org/): Make the code extension-compatible.

### Install Ganache, Web3js and Browserify:

	sudo apt-get update
	sudo apt-get install nodejs 
	sudo apt-get install npm
	sudo npm install -g ganache-cli browserify web3


## Compile Smart Contracts:
We use our own SC thought to make efficient transactions with this extension.
If you want to create your own SC we recommend the use of [Remix](https://remix.ethereum.org//).
Then you simply insert the abi and bytecode into the params in content.js.

## Smart Contracts Deployment:
First you need to init the Blockchain the Contracts are going to be deployed on:

	ganache-cli
  
  
 If you want to execute Ganache from your own machine (not a VM), you should change the "url" parameter in content.js by:

	var url = 'HTTP://127.0.0.1:8545'
  

## Use Browserify to get the extension ready to work:

	browserify content.js -o browserified-content.js


## Install the extension in Firefox:
Open [Debugging](about:debugging#/runtime/this-firefox) in Firefox and click on "Load Temporary Add-on".
Then select any file of the project and it will be ready to go!



## Author

* **Eduard Bel Ribes** - [EduardBel](https://github.com/EduardBel)
