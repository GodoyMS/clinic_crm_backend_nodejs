import { Request, Response } from 'express';
import { userService } from '@services/db/clinicUser.service';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import HTTP_STATUS from 'http-status-codes';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { appointmentService } from '@services/db/appointment.service';
import { IAppointmentDocument } from '@root/features/appointment/interfaces/appointmentDocument.interface';
import { AuthPayload } from '../interfaces/authPayload.interface';


export class GetClinicAppointmentById {
   public async read(req: Request, res: Response): Promise<void> {
      const appointmentID = req.params.id;
      const { userId } = req.currentUser as AuthPayload;

      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);

      if (!existingUser) {
         throw new BadRequestError('Invalid credentials');
      }

      const existingAppointment:IAppointmentDocument  | undefined = await appointmentService.getAppointmentById(appointmentID);
      if (!existingAppointment) {
         throw new BadRequestError('Invalid appointment');

      }



      res.status(HTTP_STATUS.OK).json({ appointment:existingAppointment  });
   }
}
