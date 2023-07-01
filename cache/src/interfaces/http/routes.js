"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = require("@clinic/auth/routes/authRoutes");
const base_queue_1 = require("@services/queues/base.queue");
const configEnvs_1 = require("@configs/configEnvs");
const auth_middleware_1 = require("@helpers/middlewares/auth-middleware");
const authPatientRoutes_1 = require("@patient/auth/routes/authPatientRoutes");
const clinicActions_1 = require("@clinic/auth/routes/clinicActions");
const currentUser_1 = require("@clinic/auth/routes/currentUser");
const currentUserPatient_1 = require("@patient/auth/routes/currentUserPatient");
const clinicActionsUser_1 = require("@clinic/user/routes/clinicActionsUser");
const authDoctorRoutes_1 = require("@doctor/auth/routes/authDoctorRoutes");
const currentUserDoctor_1 = require("@doctor/auth/routes/currentUserDoctor");
exports.default = (app) => {
    const routes = () => {
        app.use('/queues', base_queue_1.serverAdapter.getRouter());
        //CLINIC ROUTES
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, authRoutes_1.authRoutesClinic.signInSingUpRoutes());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, authRoutes_1.authRoutesClinic.signoutRoute());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, authRoutes_1.authRoutesClinic.deleteClinicRoute());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, currentUser_1.currentUserRoutesClinic.currentUserRoute());
        //actions
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, clinicActions_1.clinicAuthActionsRoutes.getUpdateAuth());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, clinicActions_1.clinicAuthActionsRoutes.patientActions());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, clinicActions_1.clinicAuthActionsRoutes.doctorActions());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, clinicActions_1.clinicAuthActionsRoutes.appointmentActions());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, auth_middleware_1.authMiddleware.verifyUser, clinicActionsUser_1.clinicUserActionsRoutes.updateClinicInfoRoute());
        //PATIENT ROUTES
        app.use(configEnvs_1.config.BASE_PATH_PATIENT, authPatientRoutes_1.authPatientRoutes.routes());
        app.use(configEnvs_1.config.BASE_PATH_PATIENT, authPatientRoutes_1.authPatientRoutes.signoutRoute());
        app.use(configEnvs_1.config.BASE_PATH_PATIENT, auth_middleware_1.authMiddleware.verifyUser, currentUserPatient_1.currentUserRoutesPatient.routes());
        //actions
        //DOCTOR ROUTES
        app.use(configEnvs_1.config.BASE_PATH_PATIENT, authPatientRoutes_1.authPatientRoutes.routes());
        app.use(configEnvs_1.config.BASE_PATH_CLINIC, authDoctorRoutes_1.authDoctorRoutes.signoutRoute());
        app.use(configEnvs_1.config.BASE_PATH_PATIENT, auth_middleware_1.authMiddleware.verifyUser, currentUserDoctor_1.currentUserRoutesDoctor.routes());
        //actions
        app.use('/', (req, res) => {
            res.send('Hello, world!');
        });
    };
    routes();
};
//# sourceMappingURL=routes.js.map