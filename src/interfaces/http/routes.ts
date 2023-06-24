import { Application } from 'express';
import { authRoutesClinic } from '@clinic/auth/routes/authRoutes';
import { serverAdapter } from '@services/queues/base.queue';
import { config } from '@configs/configEnvs';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { authPatientRoutes } from '@patient/auth/routes/authPatientRoutes';
import { clinicAuthActionsRoutes } from '@clinic/auth/routes/clinicActions';

import { currentUserRoutesClinic } from '@clinic/auth/routes/currentUser';
import { currentUserRoutesPatient } from '@patient/auth/routes/currentUserPatient';
import { clinicUserActionsRoutes } from '@clinic/user/routes/clinicActionsUser';
import { authDoctorRoutes } from '@doctor/auth/routes/authDoctorRoutes';
import { currentUserRoutesDoctor } from '@doctor/auth/routes/currentUserDoctor';
export default (app: Application) => {
   const routes = () => {
      app.use('/queues', serverAdapter.getRouter());

      //CLINIC ROUTES
      app.use(config.BASE_PATH_CLINIC!, authRoutesClinic.signInSingUpRoutes());
      app.use(config.BASE_PATH_CLINIC!, authRoutesClinic.signoutRoute());
      app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, authRoutesClinic.deleteClinicRoute());
      app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, currentUserRoutesClinic.currentUserRoute());

            //actions
            app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, clinicAuthActionsRoutes.getUpdateAuth());
            app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, clinicAuthActionsRoutes.patientActions());
            app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, clinicAuthActionsRoutes.doctorActions());
            app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, clinicAuthActionsRoutes.appointmentActions());
            app.use(config.BASE_PATH_CLINIC!, authMiddleware.verifyUser, clinicUserActionsRoutes.updateClinicInfoRoute());

      //PATIENT ROUTES
      app.use(config.BASE_PATH_PATIENT!, authPatientRoutes.routes());
      app.use(config.BASE_PATH_PATIENT!, authPatientRoutes.signoutRoute());
      app.use(config.BASE_PATH_PATIENT!, authMiddleware.verifyUser, currentUserRoutesPatient.routes());
      //actions

      //DOCTOR ROUTES
      app.use(config.BASE_PATH_PATIENT!, authPatientRoutes.routes());
      app.use(config.BASE_PATH_CLINIC!, authDoctorRoutes.signoutRoute());
      app.use(config.BASE_PATH_PATIENT!, authMiddleware.verifyUser, currentUserRoutesDoctor.routes());
      //actions

      app.use('/', (req, res) => {
         res.send('Hello, world!');
      });
   };
   routes();
};
