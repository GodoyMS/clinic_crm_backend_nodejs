import { IAppointmentDocument } from '@root/features/appointment/interfaces/appointmentDocument.interface';
import { ISignUpDataAppointment } from '@root/features/appointment/interfaces/signUpAppointment.interface';


export abstract class AppointmentUtility{
   protected registerAppointment(data: ISignUpDataAppointment): IAppointmentDocument {
      const { _id, clinic,doctor,patient,dateStart,dateEnd, reason } = data;
      return {
        _id,
        clinic,
        doctor,
        patient,
        dateStart,
        dateEnd,
        reason
      } as unknown as IAppointmentDocument;
    }
   }
