import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
// import { promise } from 'protractor';
import Web3  from 'web3';
import {Contract} from 'web3-eth-contract'
declare var window:any;
const ContractAbi=require("./ContractABI.json");
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
private web3:Web3;
private contract:Contract;
private contractAddress="0x54f9f742a0B8A5c3898Df021D2bFAFf7A8082229";
  constructor(private zone: NgZone) {
    if(window.web3){
      this.web3=new Web3(window.ethereum);
      this.contract= new this.web3.eth.Contract(ContractAbi,this.contractAddress);
      window.ethereum.enable().catch((err)=>{
        console.log(err);
      });
    }else{
      console.warn("Meta Mask not found Please install metamask or enable it");
    }
   }

   getAccount():Promise<string>{
     return this.web3.eth.getAccounts().then((accounts)=> accounts[0]||'');
   }

   // for executing transaction
   async executeTransaction(fnName:string, ...args:any[]): Promise<void>{
    const acc= await this.getAccount();  
    this.contract.methods[fnName](...args).send({from:acc,gas: 350000 });
  }

  // for reading data from blockchain 
  async call(fndName:string, ...args: any[]) {
    const acc = await this.getAccount();
    return this.contract.methods[fndName](...args).call({ from: acc });
  }

  // onEvents(event: string) {
  //   return new Observable((observer) => {
  //     this.contract.events[event]().on('data', (data) => {
  //       this.zone.run(() => {
  //         observer.next({
  //           event: data.event,
  //           payload: data.returnValues,
  //         });
  //       });
        
  //     });
  //   });
  // }

}
