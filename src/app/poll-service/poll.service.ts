import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { poll, pollForm } from '../types';
import {delay} from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import {fromAscii,toAscii} from 'web3-utils'
@Injectable({
  providedIn: 'root'
})
export class PollService {
  

  constructor(private web3:Web3Service ) { }
  
 async getPolls(): Promise<poll[]> {
    const polls:poll[]=[];

    const totalPolls= await this.web3.call('getTotalPolls');
    const address= await this.web3.getAccount();
    
    const voter = await this.web3.call('getVoter', address);
    const voterNormalized = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
    }

    return polls
    
  }
  Vote(pollId:number, VoteNumber:number) {
    this.web3.executeTransaction("vote",pollId,VoteNumber);
    console.log(pollId,VoteNumber);
  }
  createPoll(poll:pollForm) 
  {
    this.web3.executeTransaction("createPoll",
    poll.Question,poll.thumbnail||'',
    poll.options.map(opt=>fromAscii(opt)))
    console.log(poll);
  }

  private normalizeVoter(voter) {
    return {
      id: voter[0],
      votedIds: voter[1].map((vote) => parseInt(vote)),
    };
  }

  private normalizePoll(pollRaw, voter): poll {
    return {
      id: parseInt(pollRaw[0]),
      Question: pollRaw[1],
      thumbnail: pollRaw[2],
      results: pollRaw[3].map((vote) => parseInt(vote)),
      options: pollRaw[4].map((opt) => toAscii(opt).replace(/\u0000/g, '')),
      voted:
        voter.votedIds.length &&
        voter.votedIds.find((votedId) => votedId === parseInt(pollRaw[0])) !=
          undefined,
    };
  }

  // onEvent(name: string) {
  //   return this.web3.onEvents(name);
  // }

}
