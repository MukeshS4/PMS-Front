import { UserPatientModify } from '../models';

export const patientData: UserPatientModify[] = [
  {
    appointmentId: 1,
    patient: { patientId: '1', name: 'Rekha', city: 'Noida', country: 'India' },
    description: 'headache and body pain',
    date: '1999-09-14',
    time: '23:10:45',
    employee: {
      title: 'dr',
      firstName: 'mukesh',
      lastName: 'singh',
      emailId: 'muesh@gmail.com',
      dateOfBirth: '2021-09-14',
      role: 'physician',
      employeeId: 'E01',
    },
    status: 'SCHEDULED',
  },
  {
    appointmentId: 2,
    patient: { patientId: '1', name: 'Rekha', city: 'Noida', country: 'India' },
    description: 'headache and body pain',
    date: '1999-09-14',
    time: '23:10:45',
    employee: {
      title: 'dr',
      firstName: 'mukesh',
      lastName: 'singh',
      emailId: 'muesh@gmail.com',
      dateOfBirth: '2021-09-14',
      role: 'physician',
      employeeId: 'E01',
    },
    status: 'SCHEDULED',
  },
  {
    appointmentId: 3,
    patient: { patientId: '1', name: 'Rekha', city: 'Noida', country: 'India' },
    description: 'headache and body pain',
    date: '1999-09-14',
    time: '23:10:45',
    employee: {
      title: 'dr',
      firstName: 'mukesh',
      lastName: 'singh',
      emailId: 'muesh@gmail.com',
      dateOfBirth: '2021-09-14',
      role: 'physician',
      employeeId: 'E01',
    },
    status: 'SCHEDULED',
  },
];
