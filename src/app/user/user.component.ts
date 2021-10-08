import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userSideNavigationItem } from '../app-common/data/user.navigation.data';
import { SideNavigationItem } from '../app-common/models/navigation.model';
import { ChartDataSets } from 'chart.js';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CalendarOptions, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; 
import { PatientModifyService } from './patient-modify.service';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userSideNavigationdata : SideNavigationItem[] = userSideNavigationItem;

  physicianFlag=false;
  username:any;
  emailId:any;
  apiChartData:number[]=[];

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events : [{
      title: 'All Day Event',
      description: 'description for All Day Event',
      start: '2021-10-01'
    },
    {
      title: 'Long Event',
      description: 'description for Long Event',
      start: '2021-10-07',
      end: '22021-10-10'
    },
    {
      groupId: '999',
      title: 'Repeating Event',
      description: 'description for Repeating Event',
      start: '2021-10-09T16:00:00'
    },
    {
      groupId: '999',
      title: 'Repeating Event',
      description: 'description for Repeating Event',
      start: '2021-10-16T16:00:00'
    },
    {
      title: 'Conference',
      description: 'description for Conference',
      start: '2021-10-11',
      end: '2021-10-13'
    },
    {
      title: 'Meeting',
      description: 'description for Meeting',
      start: '2021-10-12T10:30:00',
      end: '2021-10-12T12:30:00'
    },
    {
      title: 'Lunch',
      description: 'description for Lunch',
      start: '2021-10-12T12:00:00'
    },
    {
      title: 'Meeting',
      description: 'description for Meeting',
      start: '2021-10-12T14:30:00'
    },]
  
  };

  title = 'Codingvila';
  public chart_Options: ChartOptions = {
    responsive: true,
  };
  public chart_Labels: Label[] = ['Total.A', 'Upcoming.A', 'Canceled.A', 'Completed.A'];
  public chart_Type: ChartType = 'pie';
  public chart_Legend = true;
  public chart_Plugins = [];
  public chart_Data: ChartDataSets[] = [];
  public donutColors=[
    {
      backgroundColor: [
          'rgba(92, 184, 92,1)',
          'rgba(255, 195, 0, 1)',
          'rgba(217, 83, 79,1)',
          'rgba(129, 78, 40, 1)',
    ]
    }
  ];

  
  
  constructor(private route: Router,private appointmentService:PatientModifyService) { 
  }

  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.emailId=localStorage.getItem('emailId');
    if(localStorage.getItem('role')=='Physician'){
      this.physicianFlag=true;
      this.appointmentService.getAppointmentStatsByEmpId(this.emailId).subscribe((stat)=>{
        this.apiChartData.slice(0,this.apiChartData.length);
        this.apiChartData.push(...stat);
      });
      this.chart_Data=[
        {
        data: this.apiChartData
      }
      ]
    }
    else
    {
      this.appointmentService.getAllAppointmentStats().subscribe((stat)=>{
        this.apiChartData.slice(0,this.apiChartData.length);
        this.apiChartData.push(...stat);
      });
      this.chart_Data=[
        {
        data: this.apiChartData
      }
      ]
    }
 }
}
