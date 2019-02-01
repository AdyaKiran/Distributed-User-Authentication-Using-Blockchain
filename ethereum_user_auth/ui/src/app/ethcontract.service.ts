import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import { reject } from 'q';

declare let require:any;
declare let window:any;

let tokenAbi = require('../../../build/contracts/User.json');

@Injectable({
  providedIn: 'root'
})
export class EthcontractService {
  private web3Provider: null;
  private contracts: {}

  constructor() { 
    if (typeof window.web3 !== 'undefined') {
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

  registerUser(_address, _username, _ipfshash){
    let that = this;
    console.log("Entered registerUser method.");
    return new Promise((resolve, reject) => {
      let authContract = TruffleContract(tokenAbi);
      authContract.setProvider(that.web3Provider);

      authContract.deployed().then(function(instance) {
        return instance.registerUser(_username, _ipfshash, { from: _address, gas: 4698712, gasPrice: "120000000000"});
      }).then(function (status) {
        if (status){
          return resolve({status:true});
        }
      }).catch(function(error){
        console.log(error);
        return reject("Error in storing user details");
      });
    });
  }

  fetchUserData(_address)
  {
    let that = this;
    console.log("Entered registerUser method.");
    return new Promise((resolve, reject) => {
      let authContract = TruffleContract(tokenAbi);
      authContract.setProvider(that.web3Provider);

      authContract.deployed().then(function(instance) {
        return instance.fetchUserDetails({ from: _address, gas: 4698712, gasPrice: "120000000000"});
      }).then(function (status) {
        if (status){
          return resolve({status:true});
        }
      }).catch(function(error){
        console.log(error);
        return reject("Error in querying user details");
      });
    });
  }

  registerWebsite(_address, _website, _permissions){
    let that = this;
    console.log("Entered registerWebsite method.");
    return new Promise((resolve, reject) => {
      let authContract = TruffleContract(tokenAbi);
      authContract.setProvider(that.web3Provider);

      authContract.deployed().then(function(instance) {
        return instance.registerWebsite(_website, _permissions, { from: _address, gas: 4698712, gasPrice: "120000000000"});
      }).then(function (status) {
        if (status){
          return resolve({status:true});
        }
      }).catch(function(error){
        console.log(error);
        return reject("Error in registering website URL");
      });
    });
  }
}
