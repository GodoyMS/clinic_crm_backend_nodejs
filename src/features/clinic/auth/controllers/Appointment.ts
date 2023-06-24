import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { userService } from '@services/db/clinicUser.service';
import { userService as userServiceDoctor } from '@services/db/doctorUser.service';
import { userService as userServicePatient } from '@services/db/patientUser.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { AuthPayload } from '../interfaces/authPayload.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@clinic/user/interfaces/userDocument.interface';
import { IUserDocument as IUserDocumentDoctor } from '@doctor/user/interfaces/userDocument.interface';
import { IUserDocument as IUserDocumentPatient } from '@patient/user/interfaces/userDocument.interface';

import { UserCache } from '@services/redis/clinicUser.cache';
import bcrypt from 'bcryptjs';
import { ILocation } from '@clinic/user/interfaces/location.interface';
import { AppointmentUtility } from './utilities/appointment.utility';
import { IAppointmentDocument } from '@root/features/appointment/interfaces/appointmentDocument.interface';
import { appointmentQueue } from '@services/queues/appointment.queue';
import { clinicActionsService } from '@services/db/clinicActions/clinicActions';
import { appointmentService } from '@services/db/appointment.service';
const userCache: UserCache = new UserCache();

export class Appointment extends AppointmentUtility {
   public async create(req: Request, res: Response): Promise<void> {
      const { reason, doctorID, patientID, dateStart, dateEnd } = req.body;
      const { userId } = req.currentUser as AuthPayload;

      const existingUser: IUserDocument | undefined = await userService.getUserDocById(userId);

      if (!existingUser) {
         throw new BadRequestError('Invalid credentials');
      }

      const existingDoctor: IUserDocumentDoctor | undefined = await userServiceDoctor.getUserDocById(doctorID);
      if (!existingDoctor) {
         throw new BadRequestError('Invalid doctor');
      }

      const existingPatient: IUserDocumentPatient | undefined = await userServicePatient.getUserDocById(patientID);
      if (!existingPatient) {
         throw new BadRequestError('Invalid Patient');
      }

      const appointmentObjectId: ObjectId = new ObjectId();

      const appointmentDoc: IAppointmentDocument = Appointment.prototype.registerAppointment({
         _id: appointmentObjectId,
         clinic: existingUser.id,
         doctor: existingDoctor.id,
         patient: existingPatient.id,
         reason: reason,
         dateStart,
         dateEnd,
      });

      appointmentQueue.addAppointmentJob('addAppointmentToDB', { value: appointmentDoc });


       res.status(HTTP_STATUS.OK).json({
         message: 'Appointment succesfully created',
         appointment:appointmentDoc
      });



   }
}
