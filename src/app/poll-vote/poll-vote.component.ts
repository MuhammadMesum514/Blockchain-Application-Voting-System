  import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import ApexCharts from 'apexcharts';
import { PollVote } from '../types';
  @Component({
    selector: 'app-poll-vote',
    templateUrl: './poll-vote.component.html',
    styleUrls: ['./poll-vote.component.scss']
  })
  export class PollVoteComponent implements AfterViewInit {
  @Input() voted:boolean;
  @Input() options:string[];
  @Input() Question:string;
  @Input() results:number[];
  @Input() id:number;
  @Output() pollVoted:EventEmitter<PollVote>=new EventEmitter();  

    pollvoteForm:FormGroup; 
    // options= ['Monday','Tuesday','Wednesday'];
    
    constructor(private fb:FormBuilder) {
      this.pollvoteForm=this.fb.group({
        selection:this.fb.control('',[Validators.required]),
        
      });
      
    }
    

    ngAfterViewInit() {
    if(this.voted){
      this.generateChart();
    }
    }
    
    submitForm(){
      const pollVoted:PollVote={
        id:this.id,
        vote:this.pollvoteForm.get("selection").value,
      }
      this.pollVoted.emit(pollVoted);
    }
    
    generateChart(){
      const options:ApexCharts.ApexOptions={
        series:[
          {
            data: this.results,
          },
        ],
        chart:{
          height:350,
          type:'bar',
        },
        plotOptions:{
          bar:{
            columnWidth:'45%',
            distributed:true,
          },
        },
        legend:{
          show:false,
        },
        xaxis: {
          categories:this.options,
          
        },
      };
      const chart= new ApexCharts(document.getElementById("poll-results"),options);
      chart.render();
    }
  }
  
