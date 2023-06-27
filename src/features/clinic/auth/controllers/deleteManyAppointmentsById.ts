import { Request, Response } from 'express';
import { userService } from '@services/db/clinicUser.service';
import { appointmentService } from '@services/db/appointment.service';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { AuthPayload } from '../interfaces/authPayload.interface';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
export class DeleteManyAppointments {
   public async delete(req: Request, res: Response): Promise<void> {
      const { appointmentsIds } = req.body;
      const { userId } = req.currentUser as AuthPayload;
      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);
      if (!existingUser) {
         throw new BadRequestError('Invalid credentials');
      }

      await appointmentService.deleteManyAppointmentsBydId(appointmentsIds);

      res.status(HTTP_STATUS.OK).json({
         message: 'Appointments were succesfully deleted',
      });
   }
}
