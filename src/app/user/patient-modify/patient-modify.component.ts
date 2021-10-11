import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { UserPatientModify, SideNavigationItem } from 'src/app/app-common/models';
import {PatientModifyService} from 'src/app/user/patient-modify.service';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';

@Component({
  selector: 'app-patient-modify',
  templateUrl: './patient-modify.component.html',
  styleUrls: ['./patient-modify.component.css']
})
export class PatientModifyComponent implements OnInit {

  userSideNavigationdata: SideNavigationItem[] = userSideNavigationItem;

  statuses:any;
  loading: boolean=false;
  displayDialog:boolean=false;
  reason:string="";
  appointment:any;
  emailId:any;

//   onBeforeHide: EventEmitter | undefined;
// onAfterHide: EventEmitter | undefined;
  

//start of model attribute definition

  constructor(private appointmentService:PatientModifyService,private router:Router,public dialog: MatDialog) { }
  listOfAppointment: UserPatientModify[]=[];
  ngOnInit(): void {
    if(localStorage.getItem('role')=='Physician')
    {
      this.emailId=localStorage.getItem('emailId');
      this.appointmentService.getAllAppointmentByUserEmailId(this.emailId).subscribe((appointment)=>{
        this.listOfAppointment.splice(0,this.listOfAppointment.length);
        this.listOfAppointment.push(...appointment);
      });
    }
    else
    {
      this.appointmentService.getAllAppointment()
      .subscribe((listOfAppointment) => {
        this.listOfAppointment.splice(0, this.listOfAppointment.length); // Clear array
        this.listOfAppointment.push(...listOfAppointment); // add new element
      });
    }
  }

  addAppointment()
  {
    this.dialog.open(AddScheduleComponent, {
      height: '600px',
      width: '700px',
    });
  }

  onDelete(appointment:UserPatientModify){
    this.displayDialog=true;
    this.appointment=appointment;
  }

  cancelAppointment(rr:any){
    this.reason=rr.value;
    this.displayDialog=false;
    this.appointmentService.cancelAppointment(this.appointment.appointmentId,this.reason).subscribe((data) => { 
      //console.log(data);     
    });
    this.router.navigateByUrl('/user/modifyappointment');
  }

  onEdit(appointment:UserPatientModify){
    this.dialog.open(EditScheduleComponent, {
      height: '600px',
      width: '700px',
      data: {appointmentId:appointment.appointmentId}
    });
  }
  clear(table: Table) {
    table.clear();
  }

  cancel() {
    this.displayDialog=false;
}

}

