import { SideNavigationItem, SideNavigationItems, HeaderItem, SideNavigationSection } from "../models";

export const userSideNavigationItem: SideNavigationItem[] = [
    {
        icon: 'pi pi-fw pi-th-large',
        label: 'Dashboard',
        routerLink: '/user',
    },
    {
        icon: 'pi pi-fw pi-inbox',
        label: 'Inbox',
        items: [
            {
                icon: 'pi pi-fw pi-user',
                label: 'Appointment',
                routerLink: '/user/inbox',
            },
        ]
    },
    {
        icon: 'pi pi-fw pi-calendar',
        label: 'Appointment Schedule',
        items: [
            {
                icon: 'pi pi-fw pi-plus',
                label: 'Add Appointment',
                routerLink: '/user/modifyappointment/addschedule',
            },
            {
                icon: 'pi pi-fw pi-trash',
                label: 'Modify Appointment',
                routerLink: '/user/modifyappointment',
            },
        ]
    },
    {
        icon: 'pi pi-fw pi-users',
        label: 'Patient(to be done)',
        items: [
            {
                icon: 'pi pi-fw pi-user-plus',
                label: 'Summary',
                routerLink: '/patient',
            },
            {
                icon: 'pi pi-fw pi-user-minus',
                label: 'Visit History',
                routerLink: '/user/patient/patient-visit',
            }
        ]
    },
    {
        icon:'pi pi-fw pi-book',
        label: 'Employee Summary',
        routerLink: '/user/inboxschedule',
    },
    {
        icon:'pi pi-fw pi-users',
        label: 'User Management',
        routerLink: '/user/inboxschedule',
    }
]