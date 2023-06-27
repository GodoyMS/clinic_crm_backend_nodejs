import express, { Router } from 'express';
import {  authMiddleware } from '@helpers/middlewares/auth-middleware';
import { UpdateAuth } from '@clinic/auth/controllers/updateAuth';
import { GetClinicPatients } from '../controllers/getClinicPatients';
import { RegisterPatient } from '../controllers/registerPatient';
import { UpdatePatientInfo } from '../controllers/updatePatientInfo';
import { UpdateClinicHistory } from '../controllers/updateClinicHistory';
import { upload } from '@helpers/multer/storage';
import { UpdateOdontogram } from '../controllers/updateOdontogram';
import { UpdateConsent } from '../controllers/updateConsent';
import { DeleteUserPatient } from '../controllers/deletePatientById';
import { RegisterDoctor } from '../controllers/registerDoctor';
import { Appointment } from '../controllers/Appointment';
import { GetClinicDoctors } from '../controllers/getClinicDoctors';
import { DeleteUserDoctor } from '../controllers/deletDoctorById';
import { GetClinicAppointments } from '../controllers/getClinicAppointments';
import { DeleteAppointment } from '../controllers/deleteAppointmentById';
import { GetClinicAppointmentById } from '../controllers/getAppointmentById';
import { DeleteManyAppointments } from '../controllers/deleteManyAppointmentsById';
import { UpdateDoctor } from '../controllers/updateDoctor';
// const upload = multer({ dest: 'uploads/' });
class ClinicAuthActionsRoutes {
   private router: Router;
   constructor() {
      this.router = express.Router();
   }

   public getUpdateAuth(): Router {
      // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
      // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
      this.router.put('/updateAuth', authMiddleware.checkAuthentication, UpdateAuth.prototype.update);
      this.router.put('/updatePassword', authMiddleware.checkAuthentication, UpdateAuth.prototype.updatePassword);
      this.router.get('/getAuthData', authMiddleware.checkAuthentication, UpdateAuth.prototype.getAuthData);

      return this.router;
   }

   public patientActions(): Router {
      this.router.get('/getClinicPatients', authMiddleware.checkAuthentication, GetClinicPatients.prototype.read);
      this.router.delete('/deletePatient/:id', authMiddleware.checkAuthentication, DeleteUserPatient.prototype.delete);
      this.router.post('/registerPatient', authMiddleware.checkAuthentication, RegisterPatient.prototype.create);
      this.router.put('/updatePatient/:id', authMiddleware.checkAuthentication, UpdatePatientInfo.prototype.update);
      this.router.put(
         '/uploadClinicHistory/:id',
         authMiddleware.checkAuthentication,
         upload,
         UpdateClinicHistory.prototype.upload,
      );
      this.router.put(
         '/uploadOdontogram/:id',
         authMiddleware.checkAuthentication,
         upload,
         UpdateOdontogram.prototype.upload,
      );
      this.router.put('/uploadConsent/:id', authMiddleware.checkAuthentication, upload, UpdateConsent.prototype.upload);
      this.router.put(
         '/deleteClinicHistory/:id',
         authMiddleware.checkAuthentication,
         UpdateClinicHistory.prototype.delete,
      );
      this.router.put('/deleteOdontogram/:id', authMiddleware.checkAuthentication, UpdateOdontogram.prototype.delete);
      this.router.put('/deleteConsent/:id', authMiddleware.checkAuthentication, UpdateConsent.prototype.delete);

      return this.router;
   }

   public doctorActions(): Router {
      this.router.post('/doctor/registerDoctor', authMiddleware.checkAuthentication, RegisterDoctor.prototype.create);
      this.router.get('/doctor/getClinicDoctors', authMiddleware.checkAuthentication, GetClinicDoctors.prototype.read);
      this.router.delete(
         '/doctor/deleteClinicDoctor/:id',
         authMiddleware.checkAuthentication,
         DeleteUserDoctor.prototype.delete,
      );
      this.router.put(
         '/doctor/updateClinicDoctorProfileImage/:id',
         authMiddleware.checkAuthentication,
         UpdateDoctor.prototype.updateProfileById,
      );

      return this.router;
   }

   public appointmentActions(): Router {
      this.router.post(
         '/appointment/registerAppointment',
         authMiddleware.checkAuthentication,
         Appointment.prototype.create,
      );
      this.router.get(
         '/appointment/getClinicAppointments',
         authMiddleware.checkAuthentication,
         GetClinicAppointments.prototype.read,
      );
      this.router.delete(
         '/appointment/deleteClinicAppointment/:id',
         authMiddleware.checkAuthentication,
         DeleteAppointment.prototype.delete,
      );
      this.router.post(
         '/appointment/deleteManyClinicAppointments',
         authMiddleware.checkAuthentication,
         DeleteManyAppointments.prototype.delete,
      );

      this.router.get(
         '/appointment/getClinicAppointment/:id',
         authMiddleware.checkAuthentication,
         GetClinicAppointmentById.prototype.read,
      );

      return this.router;
   }
}

export const clinicAuthActionsRoutes: ClinicAuthActionsRoutes = new ClinicAuthActionsRoutes();
