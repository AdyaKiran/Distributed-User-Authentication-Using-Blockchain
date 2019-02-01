import { Component } from '@angular/core';
import { EthcontractService} from './ethcontract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Registration Page';

  accounts:any;
  transferFrom: '0x0';
  balance = '0 ETH';
  // ipfshash = '';

  constructor( private ethcontractService: EthcontractService ){
    console.log('TEST');
    this.initAndDisplayAccount();
  }

  initAndDisplayAccount = () => {
    let that = this;
    this.ethcontractService.getAccountInfo().then(function(acctInfo : any){
      console.log(acctInfo);
      that.transferFrom = acctInfo.fromAccount;
      that.balance = acctInfo.balance;
    }).catch(function(error){
      console.log(error);
    });
  };

  fetchData(){
    let that = this;
    this.ethcontractService.fetchUserData(this.transferFrom).then(function() {
      console.log("Successfully fetched data");
      // that.initAndDisplayAccount();
      // that.fetchData();
    }).catch(function(error){
      console.log(error);
      // that.initAndDisplayAccount();
      // that.fetchData();
    });
  }

  addToIPFS(uname, name, DOB, passportNo, adhaarNo){
    let that = this;

    const userData = {
      userName: uname,
      fullName: name,
      dateOfBirth: DOB,
      passportNumber: passportNo,
      adhaarNumber: adhaarNo
    }

    let ipfshash='';

    const IPFS = require('ipfs-mini');
    const ipfs = new IPFS({host: "ipfs.infura.io", port: 5001, protocol: "https"});
    ipfs.add(JSON.stringify(userData), (err, hash) => {
      if (err) {
        return console.log(err);
      }
      console.log("HASH : " + hash.toString());
      ipfshash = hash.toString();
      console.log("Adding IPFSHASH " + ipfshash);
      console.log("TEST : Adding IPFSHASH: " + ipfshash);
      this.ethcontractService.registerUser(that.transferFrom, uname, ipfshash).then(function() {
        that.fetchData();
        that.initAndDisplayAccount();
        // that.fetchData();
      }).catch(function(error){
        console.log(error);
        that.fetchData();
        that.initAndDisplayAccount();
        // that.fetchData();
      });
    });
  }

  registerWeb(wname, usernamePerm, firstNamePerm, dobPerm, passportNumberPerm, adhaarNumberPerm){
    let that = this;
    if(!usernamePerm) usernamePerm = false;
    if(!firstNamePerm) firstNamePerm = false;
    if(!dobPerm) dobPerm = false;
    if(!passportNumberPerm) passportNumberPerm = false;
    if(!adhaarNumberPerm) adhaarNumberPerm = false;
    let permissions = [usernamePerm, firstNamePerm, dobPerm, passportNumberPerm, adhaarNumberPerm]  
    console.log(permissions);
    console.log("Adding Website URL " + wname);
    this.ethcontractService.registerWebsite(this.transferFrom, wname, permissions).then(function() {
      console.log(wname);
      that.initAndDisplayAccount();
    }).catch(function(error){
      console.log(error);
      that.initAndDisplayAccount();
    });
  }
}
