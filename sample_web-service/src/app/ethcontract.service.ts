import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import { reject, resolve } from 'q';

declare let require:any;
declare let window:any;

// let abi = [{
//   "constant": true,
//   "inputs": [
//     {
//       "name": "_website",
//       "type": "bytes32"
//     }
//   ],
//   "name": "getUserData",
//   "outputs": [
//     {
//       "name": "_username",
//       "type": "string"
//     },
//     {
//       "name": "_name",
//       "type": "string"
//     },
//     {
//       "name": "_dob",
//       "type": "string"
//     },
//     {
//       "name": "_passportNo",
//       "type": "string"
//     },
//     {
//       "name": "_adhaarNo",
//       "type": "string"
//     }
//   ],
//   "payable": false,
//   "stateMutability": "view",
//   "type": "function"
// }];

// let abi2 = [{
//   "constant": false,
//   "inputs": [
//     {
//       "name": "myid",
//       "type": "bytes32"
//     },
//     {
//       "name": "result",
//       "type": "string"
//     },
//     {
//       "name": "proof",
//       "type": "bytes"
//     }
//   ],
//   "name": "__callback",
//   "outputs": [],
//   "payable": false,
//   "stateMutability": "nonpayable",
//   "type": "function"
// },
// {
//   "constant": false,
//   "inputs": [],
//   "name": "fetchUserDetails",
//   "outputs": [],
//   "payable": true,
//   "stateMutability": "payable",
//   "type": "function"
// }];

let abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "registeredWebsites",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "userName",
    "outputs": [
      {
        "name": "",
        "type": "bytes16"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "userData",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ipfsHash",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "userAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_username",
        "type": "bytes16"
      },
      {
        "name": "_ipfshash",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUsername",
    "outputs": [
      {
        "name": "",
        "type": "bytes16"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_website",
        "type": "bytes32"
      },
      {
        "name": "_permissions",
        "type": "bool[]"
      }
    ],
    "name": "registerWebsite",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_website",
        "type": "bytes32"
      }
    ],
    "name": "getPermissionForWebsite",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "myid",
        "type": "bytes32"
      },
      {
        "name": "result",
        "type": "string"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "myid",
        "type": "bytes32"
      },
      {
        "name": "result",
        "type": "string"
      },
      {
        "name": "proof",
        "type": "bytes"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "fetchUserDetails",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_website",
        "type": "bytes32"
      }
    ],
    "name": "getUserData",
    "outputs": [
      {
        "name": "_username",
        "type": "string"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_dob",
        "type": "string"
      },
      {
        "name": "_passportNo",
        "type": "string"
      },
      {
        "name": "_adhaarNo",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
@Injectable({
  providedIn: 'root'
})
export class EthcontractService {
  private web3Provider: null;
  private contracts:{}

  constructor() { 
    if (typeof window.web3 != 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7542');
    }
    window.web3 = new Web3(this.web3Provider);
  }

  getAccountInfo() {
    console.log('Testing');
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account){
        if (err==null){
          window.web3.eth.getBalance(account, function(err, balance){
            if (err==null){
              return resolve({fromAccount: account, balance:(window.web3.fromWei(balance,'ether')).toNumber()});
            }
            else {
              return reject({fromAccount: "error", balance:0});
            }
          })
        }
      })
    })
  }

  fetchUserData(_address, _sender) {
    try {
      let that = this;
      console.log("Enternig fetch() function");
      return new Promise ((resolve, reject) => {
      var contract = window.web3.eth.contract(abi).at(_address);
      console.log("Enternig fetch() function");
      contract.fetchUserDetails({
        from:_sender,
        gas:4698712},function (error, result) { //get callback from function which is your transaction key
          if(!error) {
            console.log(result);
            return resolve("true");
          } 
          else{
            console.log("Enternig fetch() function");
            console.log(error);
            return reject({"messsage": error});
          }
        });
      });
    }
    catch(err) {
      console.log("ERRROR");
    }
  }

  async getData(_website, _address, _sender){
    let that = this;
    console.log("Entered getData method for website " + _website);
    // var contract = window.web3.eth.contract(abi).at(_address);
    // var x = await this.fetchUserData(_address, _sender);

    return new Promise ((resolve, reject) => {
      var contract = window.web3.eth.contract(abi).at(_address);
      contract.getUserData.call(_website, {
            from:_sender,
            gas:4698712},function (error, result){ //get callback from function which is your transaction key
                if(!error){
                    // console.log({username: result[0], fullName: result[1], dob: result[2], passportNo: result[3], adhaarNo: result[4]});                    
                    // console.log(result[0] + " " + result[1] +" "+ result[2] +" "+ result[3] +" "+ result[4]);
                    //console.log(result[0].toAscii);
                    return resolve({username: result[0], fullName: result[1], dob: result[2], passportNo: result[3], adhaarNo: result[4]});
                } else{
                    console.log(error);
                    return reject({"messsage": "error"});
                }
        });
    });
  }
}
