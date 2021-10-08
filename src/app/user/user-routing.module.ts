import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { PatientModifyComponent } from './patient-modify/patient-modify.component';
import { PhysicianInboxComponent } from './physician-inbox/physician-inbox.component';
import { SendNotesComponent } from './send-notes/send-notes.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'inbox', component: PhysicianInboxComponent },
  { path: 'modifyappointment/addschedule', component: AddScheduleComponent },
  { path: 'modifyappointment/editschedule/:appointmentId', component: EditScheduleComponent },
  { path: 'modifyappointment', component: PatientModifyComponent },
  { path: 'inbox/sendnotes', component: SendNotesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
