import { Component } from '@angular/core';
import { EthcontractService} from './ethcontract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webservice1';
  contractAddress;
  transferFrom:'0x0';
  userDetails = "";

  constructor( private ethcontractService: EthcontractService ){
    console.log('TEST');
    this.initAndDisplayAccount();
  }

  initAndDisplayAccount = () => {
    let that = this;
    this.ethcontractService.getAccountInfo().then(function(acctInfo : any){
      console.log(acctInfo);
      that.transferFrom = acctInfo.fromAccount;
    }).catch(function(error){
      console.log(error);
    });
  };

  fetchUserData(_contractAddress) {
    let that = this;
    this.contractAddress = _contractAddress;
    this.ethcontractService.fetchUserData(this.contractAddress, this.transferFrom);
  }

  getDataOfUser(_contractAddress) {
    let that = this;
    this.contractAddress = _contractAddress;
    this.ethcontractService.getData('www.google.ae', this.contractAddress, this.transferFrom).then(function(userData: any){
      // console.log(userData);
      that.userDetails = userData;
      console.log(that.userDetails);
    });
  }
}
