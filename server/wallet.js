const express = require('express');
const ethers = require("ethers");

const walletRouter = express.Router();

//const network = 'https://rinkeby.infura.io/v3/690d9a4b12424f8ebf80ea400cf1f4bf';
/*
const provider = new ethers.providers.JsonRpcProvider(
    network,
    "rinkeby"
  );
*/

//const privateKey = '0xd6c9bb02fa9a5e0ea960eda40ce207c7aea23f1b2bff5a2ac2d2891134330043';

const network = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(network);
const privateKey = '0x8662c84a2495fab5f292712c706d3d7da8683b1b9ceb297810203c4177af71e3';

const address = '0xAc48C5df98F1b4E0B8178684543FCC36e93772aB';
const abi = [ { "inputs": [ { "internalType": "address[]", "name": "_owners", "type": "address[]" }, { "internalType": "uint256", "name": "_numOfConfirmationsRequired", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "txIndex", "type": "uint256" } ], "name": "ConfirmTransaction", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "txIndex", "type": "uint256" } ], "name": "ExecuteTransaction", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "txIndex", "type": "uint256" } ], "name": "RevokeConfirmation", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "txIndex", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "val", "type": "uint256" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "SubmitTransaction", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_txIndex", "type": "uint256" } ], "name": "confirmTransaction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_txIndex", "type": "uint256" } ], "name": "executeTransaction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwners", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_txIndex", "type": "uint256" } ], "name": "getTransaction", "outputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTransactionCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "isConfirmed", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numOfConfirmationsRequired", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "owners", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_txIndex", "type": "uint256" } ], "name": "revokeConfirmation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_val", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "submitTransaction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "transactions", "outputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "bool", "name": "executed", "type": "bool" }, { "internalType": "uint256", "name": "numConfirmations", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ]

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, wallet);



walletRouter.post('/submit', (req, res, next) => {
  const tx = req.body;
  const submitPromise = contract.submitTransaction(tx.to, tx.value, tx.data);
  submitPromise
    .then((response) => {
      res.send(response);
    }) 
    .catch((error) => {
      res.send(error);
    });
});

walletRouter.post('/confirm/:index', (req, res, next) => {
  
  const confirmPromise = contract.confirmTransaction(req.params.index);
  confirmPromise
    .then((response) => {
      res.send(response);
    }) 
    .catch((error) => {
      res.send(error);
    });
});

walletRouter.post('/execute/:index', (req, res, next) => { 
  const executePromise = contract.executeTransaction(req.params.index);
  executePromise
    .then((response) => {
      res.send(response);
    }) 
    .catch((error) => {
      res.send(error);
    });
});

walletRouter.post('/revoke/:index', (req, res, next) => {
  const revokePromise = contract.revokeConfirmation(req.params.index);
  revokePromise
    .then((response) => {
      res.send(response);
    }) 
    .catch((error) => {
      res.send(error);
    });
});

walletRouter.get('/transactions/:index', (req, res, next) => {
  const transaction = contract.getTransaction(req.params.index);
  transaction
    .then((tx) => {
      res.send(tx);
    })
    .catch((error) => {
      res.send(error);
    });
});

walletRouter.get('/transactionCount', (req, res, next) => {
  const transactionCount = contract.getTransactionCount();
  transactionCount
    .then((txCount) => {
      res.send(txCount);
    })
    .catch((error) => {
      res.send(error);
    });
});


walletRouter.get('/owners', (req, res, next) => {
  const owners = contract.getOwners();
  owners
    .then((ownerslist) => {
      res.send(ownerslist);
    })
    .catch((error) => {
      res.send(error);
    });
});

walletRouter.get('/balance', (req, res, next) => {
  const balance = contract.getBalance();
  balance
    .then((balanceAmount) => {
      res.send(balanceAmount);
    })
    .catch((error) => {
      res.send(error);
    });
});


module.exports = walletRouter;
