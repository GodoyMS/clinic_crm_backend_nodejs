import { IAppointmentDocument } from './appointmentDocument.interface';

export interface IAppointmentJob {
  keyOne?: string;
  keyTwo?: string;
  key?: string;
  value?: string | IAppointmentDocument;
}
