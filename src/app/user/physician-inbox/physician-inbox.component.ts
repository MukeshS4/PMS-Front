import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { notes } from 'src/app/app-common/data/notes.list';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { NotesList, SideNavigationItem, UserPatientModify } from 'src/app/app-common/models/navigation.model';
import { PatientModifyService } from '../patient-modify.service';
import { InboxService } from './inbox.service';
@Component({
  selector: 'app-physician-inbox',
  templateUrl: './physician-inbox.component.html',
  styleUrls: ['./physician-inbox.component.css']
})
export class PhysicianInboxComponent implements OnInit {

  //public days: {id:number; mydate: Date;}[] =[{id:1, mydate:new Date(2019,10,10)}];


  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  displayedColumns: string[] = ['appointmentId', 'appointmentDescription', 'date', 'time', 'patientInfo', 'editHistory', 'physicianName'];
  
  @ViewChild(MatTable, { static: true })
  table: MatTable<any> | undefined 

  notes: NotesList[] = notes;
  statuses:any;
  loading: boolean=true;
  emailId:any;
  dataSource:UserPatientModify[]=[];

  constructor(private inboxService:InboxService,private appointmentService:PatientModifyService) { }
  
  ngOnInit(): void {
    this.notes=this.inboxService.getAllNotes();
    if(localStorage.getItem('role')=='Physician'){
      this.emailId=localStorage.getItem('emailId');
      this.appointmentService.getAllAppointmentByUserEmailId(this.emailId).subscribe((appointment)=>{
        this.dataSource.splice(0,this.dataSource.length);
        this.dataSource.push(...appointment);
      });
    }
    else
    {
      this.dataSource=this.inboxService.getAllUpcomingAppointment();
    }
    this.statuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
      { label: 'Blocked', value: 'Blocked' },
      this.loading=false,
    ]
  }
editProduct() {
  console.log("hii");
}

}
