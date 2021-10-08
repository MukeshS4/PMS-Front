import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { notes } from 'src/app/app-common/data/notes.list';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { NotesList, SideNavigationItem, UserPatientModify } from 'src/app/app-common/models/navigation.model';
import { InboxService } from './inbox.service';



// export interface UsersData {
//   appointmentId: string;
//   appointmentDescription: string;
//   date: string;
//   time: string;
//   patientInfo: string;
//   editHistory: string;
// }

// const ELEMENT_DATA: UserPatientModify[] = [
//   {
//     appointmentId: 1,
//     patient: { patientId: '1', name: 'Rekha', city: 'Noida', country: 'India' },
//     description: 'headache and body pain',
//     date: '1999-09-14',
//     time: '23:10:45',
//     employee: {
//       title: 'dr',
//       firstName: 'mukesh',
//       lastName: 'singh',
//       emailId: 'muesh@gmail.com',
//       dateOfBirth: '2021-09-14',
//       role: 'physician',
//       employeeId: 'E01',
//     },
//     status: 'SCHEDULED',
//   },
//   {
//     appointmentId: 2,
//     patient: { patientId: '1', name: 'Rekha', city: 'Noida', country: 'India' },
//     description: 'headache and body pain',
//     date: '1999-09-14',
//     time: '23:10:45',
//     employee: {
//       title: 'dr',
//       firstName: 'mukesh',
//       lastName: 'singh',
//       emailId: 'muesh@gmail.com',
//       dateOfBirth: '2021-09-14',
//       role: 'physician',
//       employeeId: 'E01',
//     },
//     status: 'SCHEDULED',
//   },
//   {
//     appointmentId: 3,
//     patient: { patientId: '1', name: 'Rekha', city: 'Noida', country: 'India' },
//     description: 'headache and body pain',
//     date: '1999-09-14',
//     time: '23:10:45',
//     employee: {
//       title: 'dr',
//       firstName: 'mukesh',
//       lastName: 'singh',
//       emailId: 'muesh@gmail.com',
//       dateOfBirth: '2021-09-14',
//       role: 'physician',
//       employeeId: 'E01',
//     },
//     status: 'SCHEDULED',
//   }
// ];

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

  constructor(private inboxService:InboxService) { }
  dataSource:UserPatientModify[]=[];

  ngOnInit(): void {
    this.notes=this.inboxService.getAllNotes();
    this.dataSource=this.inboxService.getAllUpcomingAppointment();
    //this.dataSource=ELEMENT_DATA;
    console.log(this.dataSource);
     // this.userData= this.userData;
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
