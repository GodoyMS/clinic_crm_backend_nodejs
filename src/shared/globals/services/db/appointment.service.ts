import { AppointmentModel } from '@root/features/appointment/model/appointment.schema';
import { IAppointmentDocument } from '@root/features/appointment/interfaces/appointmentDocument.interface';

class AppointmentService {
   public async createAppointment(data: IAppointmentDocument): Promise<void> {
      await AppointmentModel.create(data);
   }

   public async deleteAppointmentByID(id: string): Promise<IAppointmentDocument> {
      const deletedAppointment: IAppointmentDocument = (await AppointmentModel.findByIdAndDelete(
         id,
      ).exec()) as IAppointmentDocument;
      return deletedAppointment;
   }
   public async deleteManyAppointmentsBydId(ids: Array<string>): Promise<void> {
      await AppointmentModel.deleteMany({ _id: { $in: ids } });
   }

   public async getAppointmentById(id: string): Promise<IAppointmentDocument> {
      const appointment: IAppointmentDocument = (await AppointmentModel.findById(id)
         .populate('doctor')
         .populate('patient')
         .exec()) as IAppointmentDocument;
      return appointment;
   }
}

export const appointmentService: AppointmentService = new AppointmentService();
