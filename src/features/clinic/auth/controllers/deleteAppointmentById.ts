import { Request, Response } from 'express';
import { userService } from '@services/db/clinicUser.service';
import { IAppointmentDocument } from '@root/features/appointment/interfaces/appointmentDocument.interface';
import { appointmentService } from '@services/db/appointment.service';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { AuthPayload } from '../interfaces/authPayload.interface';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
export class DeleteAppointment {
   public async delete(req: Request, res: Response): Promise<void> {
      const appointmentID = req.params.id;
      const { userId } = req.currentUser as AuthPayload;
      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid credentials');
      }
      const existingDeletedAppointment: IAppointmentDocument | undefined =
         await appointmentService.deleteAppointmentByID(appointmentID);
      if (!existingDeletedAppointment) {
         throw new BadRequestError('Invalid credentials');
      }

      res.status(HTTP_STATUS.OK).json({
         message: 'Appointment was succesfully deleted',
         deletedAppointment: existingDeletedAppointment,
      });
   }
}
