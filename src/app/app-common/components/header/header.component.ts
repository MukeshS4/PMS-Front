import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { sideNavigationItem } from '../../data/navigation.data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService : AuthService
  ) { }
  userName: any;
  display!: boolean;
  useritems!: MenuItem[];
  headerItems!: MenuItem[];
  notificationitems!: MenuItem[];
  @Input() navigationitems: any;
  ngOnInit() {
    //make a menuitem for notification as below
    this.userName = localStorage.getItem('username');
    this.useritems = [
      {
        label: this.userName,
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['/user/info'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucustom'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (event: Event)=>{ this.authService.logout()},
        // routerLink: ['/logout'],
        // routerLinkActiveOptions: {
        //   exact: true
        // },
        styleClass: 'menucustom'
      }
    ]

    this.headerItems = [
      {
        label: 'About Us',
        icon: 'pi pi-fw pi-home',
        // items: [
        //   {
        //     label: 'New',
        //     icon: 'pi pi-fw pi-plus',
        //     items: [
        //       {
        //         label: 'Bookmark',
        //         icon: 'pi pi-fw pi-bookmark'
        //       },
        //       {
        //         label: 'Video',
        //         icon: 'pi pi-fw pi-video'
        //       },

        //     ]
        //   },
        //   {
        //     label: 'Delete',
        //     icon: 'pi pi-fw pi-trash'
        //   },
        //   {
        //     separator: true
        //   },
        //   {
        //     label: 'Export',
        //     icon: 'pi pi-fw pi-external-link'
        //   }
        // ]
      },
      {
        label: 'Services',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Schedule visit',
            icon: 'pi pi-fw pi-calendar-plus'
          },
          {
            label: 'block User',
            icon: 'pi pi-fw pi-fw pi-ban'
          },
          {
            label: 'Remove Physician',
            icon: 'pi pi-fw pi-user-minus'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Admin',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Patient',
            icon: 'pi pi-fw pi-user-minus',

          },
          {
            label: 'Staff',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Physician',
                icon: 'pi pi-fw pi-plus-circle'
              },
              {
                icon: 'pi pi-fw pi-circle-on',
                label: 'Nurse'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];
  }
  // onToggle(){
  //   this.display=true;
  //   const dashboard = document.querySelector('#admin-homepage');
  //   const dashboardclose = document.querySelector('.p-sidebar-close p-sidebar-icon p-link');
  //   console.log(dashboardclose);
  //   console.log(dashboard);
  //   dashboard?.setAttribute("style","width:calc(100%-20rem)");
  // }


}
