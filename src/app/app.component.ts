import { Component } from '@angular/core';
import { PollService } from './poll-service/poll.service';
import { poll, pollForm, PollVote } from './types'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blockchain-app';
  showForm=false;
  activePoll:poll=null;
  polls=this.ps.getPolls();
  constructor(private ps:PollService){}
//  ngOnInit() {
//     this.ps.onEvent('PollCreated').subscribe(() => {
//       this.polls = this.ps.getPolls();
//     });
//   }

setActivepoll(poll){
  this.activePoll=null;

  setTimeout(() => {
    this.activePoll=poll;
  }, 100);
}
handlePollCreate(poll:pollForm){
  this.ps.createPoll(poll);
}
handlePollVote(pollVoted:PollVote){
  this.ps.Vote(pollVoted.id,pollVoted.vote);
}
}
