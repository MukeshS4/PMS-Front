import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { Employee, NotesList, SendNote, SideNavigationItem } from 'src/app/app-common/models';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-send-notes',
  templateUrl: './send-notes.component.html',
  styleUrls: ['./send-notes.component.css']
})
export class SendNotesComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  submitted = false;
  note:SendNote | undefined;
  sendNotes!: FormGroup;
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  response:string="";
  listOfReceiver:Employee[]=[];
  receiverName:string="";
  receiverDesignation:string="";

  constructor(private router: Router, private formBuilder: FormBuilder, private notesService: NotesService) { }


  ngOnInit(): void {
    this.listOfReceiver=this.notesService.getAllStaffByRole("Physician");

    this.sendNotes = this.formBuilder.group({
      receiverId: "",
      receiverName: "",
      receiverDesignation: "",
      message:"",
      priority:""
    });
   }

   get registerFormControl() {
    return this.sendNotes.controls;
  }

  showData(event: any){
    this.receiverName=event.firstName+" "+event.lastName;
    this.receiverDesignation=event.role;
    console.log(event);
  }

  onSend(){
    this.note=new SendNote(this.sendNotes.controls.receiverId.value,this.receiverName,this.receiverDesignation,this.sendNotes.controls.message.value
      ,false,this.todayDate);
    if(this.sendNotes.valid){
      this.notesService.createNote(this.note).subscribe((data) => {
        
       });
       alert('Send Notes Successfully');
    }
    else{
      alert('Please Fill mandatory Fields');
    }
    this.router.navigateByUrl('/user/inbox');
    
  }
  
  

}

function SendNotes(SendNotes: any) {
  throw new Error('Function not implemented.');
}

