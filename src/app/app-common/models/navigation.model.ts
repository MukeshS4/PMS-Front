export interface HeaderItem {
    icon?: string;
    text: string;
    link?: string;
    submenu?: SideNavigationItem[];
}

export interface SideNavigationItems {
    [index: string]: SideNavigationItem;
}

export interface SideNavigationItem {
    icon?: string;
    label: string;
    routerLink?: string;
    items?: SideNavigationItem[];
    new?: boolean;
    updated?: boolean;
}

export interface SideNavigationSection {
    text?: string;
    items: string[];
}

export interface Patient {
    id: string;
    name: string;
    dateOfRegistration: string;
    status: string;
    link1?: string;
    link2?: string;
    edit: string;
}


export class PatientInfo {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    dateOfBirth: string;
    country:number;
    contactNumber:number;
    constructor(id:number,firstName:string,lastName: string,emailId: string,dateOfBirth: string,country:number,contactNumber:number){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.emailId=emailId;
        this.dateOfBirth=dateOfBirth;
        this.country=country;
        this.contactNumber=contactNumber;
    }
}


export interface HospitalUser {
    id: string
    name: string;
    dateOfJoining: string;
    status: string;
    link1?: string;
    link2?: string;
    edit:string;
}

export interface PatientLockedAccounts{
    id: string
    name: string;
    dateOfRegistration: string | Date;
    dateOfAccountLocked: string | Date;
    status: string;
}

export interface StaffLockedAccounts{
    id: string
    name: string;
    dateOfJoining: string | Date;
    dateOfAccountLocked: string | Date;
    status: string;
}


export class UserPatientModify {
    date: string;
    time: string;
    appointmentId: string;
    patientData: PatientInfo;
    description: string;
    employee:Employee;
    status:string;
    constructor(date:string,time:string,appointmentId:string,patientData:PatientInfo,description:string,employee:Employee,status:string){
        this.date=date;
        this.appointmentId=appointmentId;
        this.patientData=patientData;
        this.description=description;
        this.employee=employee;
        this.status=status;
        this.time=time;
    }
}

export class Appointment {
    date: string;
    time: string;
    patientData: PatientInfo;
    description: string;
    employee:Employee;
    constructor(date:string,time:string,patientData:PatientInfo,description:string,employee:Employee){
        this.date=date;
        this.patientData=patientData;
        this.description=description;
        this.employee=employee;
        this.time=time;
    }
}

export class Employee{
    title:string;
    firstName:string;
    lastName:string;
    public emailId:string;
    dateOfBirth:string;
    role:string;
    employeeId:string;
    constructor(title:string,firstName:string,lastName:string,emailId:string,dateOfBirth:string,role:string,employeeId:string){
        this.firstName=firstName;
        this.title=title;
        this.lastName=lastName;
        this.emailId=emailId;
        this.dateOfBirth=dateOfBirth;
        this.role=role;
        this.employeeId=employeeId;
    }
}

export class NotesList {
    notesId:number
    receiverName: string
    receiverDesignation: string;
    message: string;
    dateTime: string;
    priority:boolean;
    receiverId: Employee;
    constructor(receiverName:string,receiverDesignation:string,message:string,dateTime:string,notesId:number,priority:boolean,receiverId: Employee){
        this.receiverName=receiverName;
        this.receiverDesignation=receiverDesignation;
        this.message=message;
        this.dateTime=dateTime;
        this.notesId=notesId;
        this.priority=priority;
        this.receiverId=receiverId;
    }
}

export class SendNote {
    receiverId: string
    receiverName: string;   
    receiverDesignation: string;
    message: string;
    priority:boolean;
    //te:Date;
    constructor(receiverId:string,receiverName:string,receiverDesignation:string,message:string,priority:boolean,date:Date){
        this.receiverId=receiverId;
        this.receiverName=receiverName;
        this.message=message;
        this.receiverDesignation=receiverDesignation;
        this.priority=priority;
        //this.date=date;
    }
}

export class CalendarEventCustom{
    //id: string;
    title: string;
    start: string;
    constructor(title:string,start:string){
        this.title=title;
        //this.id=id;
        this.start=start;
    }
}