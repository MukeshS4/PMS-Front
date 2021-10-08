import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { userSideNavigationItem } from 'src/app/app-common/data/user.navigation.data';
import { Employee, SideNavigationItem, UserPatientModify } from 'src/app/app-common/models';
import { PatientModifyService } from '../patient-modify.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate } from '@angular/common';
import { ScheduleService } from '../add-schedule/schedule.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;
  appointmentDate: Date = new Date();
  appointmentId:number=0;
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  appointment: any;
  description:string="";
  listOfTimeSlot:string[]=[];
  listOfPhysician:Employee[]=[];
  physicianId:string="";
  form: FormGroup = new FormGroup({});
  emailId:any;
  

  constructor(private router:Router,private route:ActivatedRoute,
    private appointmentService:PatientModifyService,
    private userService:ScheduleService) { }

  ngOnInit() {
    console.log("in edit schedule");
    
    this.route.params.subscribe((params:Params)=>{
      this.appointmentId=params['appointmentId'];
    });
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((data:UserPatientModify)=>{
      this.appointment=data;
    });
    if(localStorage.getItem('role')=='Physician')
    {
      this.emailId=localStorage.getItem('emailId');
      this.userService.findStaffByEmailId(this.emailId).subscribe(data=>{
        this.listOfPhysician.splice(0,this.listOfPhysician.length);
      this.listOfPhysician.push(data);
      });
    }
    else{
      this.listOfPhysician=this.userService.getAllStaffByRole("Physician");
    }
    this.form = new FormGroup({
      patient: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }
  
  appointmentDateSelectEvent(event: MatDatepickerInputEvent<Date>) {
    this.appointmentDate=event.target.value as Date;
    if(this.appointmentDate.getDay()==0){
      alert("Appointment can't be scheduled on this day");
      this.listOfTimeSlot=[];
    }else{
    this.todayString=formatDate(this.appointmentDate,'dd/MM/yyyy','en-US');
    this.listOfTimeSlot=this.appointmentService.getAllAvailableSlot(this.todayString,this.form.controls.employee.value.employeeId);   
    }   
  }
  showPhysicianId(event: any){
    this.physicianId=event.employeeId;
  }
  updateAppointment(){
    this.appointment=new UserPatientModify(this.todayString,this.form.controls.time.value,this.appointment.appointmentId,this.appointment.patient,this.form.controls.description.value,this.form.controls.employee.value,"Scheduled");
    this.appointmentService.updateAppointment(this.appointment).subscribe((data) => {      
    });
    this.router.navigateByUrl('/user/modifyappointment');
  }

}
