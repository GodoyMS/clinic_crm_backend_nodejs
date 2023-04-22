import { Application } from 'express';
import { authRoutesClinic } from '@clinic/auth/routes/authRoutes';
import { serverAdapter } from '@services/queues/base.queue';
import { config } from '@configs/configEnvs';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { authPatientRoutes } from '@patient/auth/routes/authPatientRoutes';
import { clinicActionsRoutes } from '@clinic/auth/routes/clinicActions';

import { currentUserRoutesClinic } from '@clinic/auth/routes/currentUser';
import { currentUserRoutesPatient } from '@patient/auth/routes/currentUserPatient';

export default (app: Application) => {
  const routes = () => {
    app.use('/queues', serverAdapter.getRouter());

    //CLINIC ROUTES
    app.use(config.BASE_PATH_CLINIC!, authRoutesClinic.routes());
    app.use(config.BASE_PATH_CLINIC!, authRoutesClinic.signoutRoute());
    app.use(config.BASE_PATH_CLINIC!,authMiddleware.verifyUser,currentUserRoutesClinic.routes() );
         //actions
         app.use(config.BASE_PATH_CLINIC!,authMiddleware.verifyUser,clinicActionsRoutes.routes() );




    //PATIENT ROUTES
    app.use(config.BASE_PATH_PATIENT!, authPatientRoutes.routes());
    app.use(config.BASE_PATH_PATIENT!, authPatientRoutes.signoutRoute());
    app.use(config.BASE_PATH_PATIENT!,authMiddleware.verifyUser,currentUserRoutesPatient.routes() );
         //actions



    app.use('/', (req, res) => {
      res.send('Hello, world!');
    });

  };
  routes();
};
