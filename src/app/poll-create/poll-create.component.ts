import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pollForm } from '../types';


@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {
  pollForm:FormGroup;
  @Output() PollCreated:EventEmitter<pollForm>=new EventEmitter;
  constructor(private fb:FormBuilder) {
    this.pollForm= this.fb.group({
      Question:this.fb.control('',Validators.required),
      Image: this.fb.control(''),
         op1 : this.fb.control(''),
         op2 : this.fb.control(''),
         op3 : this.fb.control(''),
    })
   }
   submitForm(){
     const formData:pollForm={
       Question:this.pollForm.get("Question").value,
       thumbnail:this.pollForm.get("Image").value,
       options:[
        this.pollForm.get("op1").value,
        this.pollForm.get("op2").value,
        this.pollForm.get("op3").value,
       ]
     };
     this.PollCreated.emit(formData);
   }

  ngOnInit(): void {
  }

}
