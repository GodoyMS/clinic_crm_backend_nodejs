"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicAuthActionsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("@helpers/middlewares/auth-middleware");
const updateAuth_1 = require("@clinic/auth/controllers/updateAuth");
const getClinicPatients_1 = require("../controllers/getClinicPatients");
const registerPatient_1 = require("../controllers/registerPatient");
const updatePatientInfo_1 = require("../controllers/updatePatientInfo");
const updateClinicHistory_1 = require("../controllers/updateClinicHistory");
const storage_1 = require("@helpers/multer/storage");
const updateOdontogram_1 = require("../controllers/updateOdontogram");
const updateConsent_1 = require("../controllers/updateConsent");
const deletePatientById_1 = require("../controllers/deletePatientById");
const registerDoctor_1 = require("../controllers/registerDoctor");
const Appointment_1 = require("../controllers/Appointment");
const getClinicDoctors_1 = require("../controllers/getClinicDoctors");
const deletDoctorById_1 = require("../controllers/deletDoctorById");
const getClinicAppointments_1 = require("../controllers/getClinicAppointments");
const deleteAppointmentById_1 = require("../controllers/deleteAppointmentById");
const getAppointmentById_1 = require("../controllers/getAppointmentById");
const deleteManyAppointmentsById_1 = require("../controllers/deleteManyAppointmentsById");
const updateDoctor_1 = require("../controllers/updateDoctor");
// const upload = multer({ dest: 'uploads/' });
class ClinicAuthActionsRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    getUpdateAuth() {
        // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
        // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
        this.router.put('/updateAuth', auth_middleware_1.authMiddleware.checkAuthentication, updateAuth_1.UpdateAuth.prototype.update);
        this.router.put('/updatePassword', auth_middleware_1.authMiddleware.checkAuthentication, updateAuth_1.UpdateAuth.prototype.updatePassword);
        this.router.get('/getAuthData', auth_middleware_1.authMiddleware.checkAuthentication, updateAuth_1.UpdateAuth.prototype.getAuthData);
        return this.router;
    }
    patientActions() {
        this.router.get('/getClinicPatients', auth_middleware_1.authMiddleware.checkAuthentication, getClinicPatients_1.GetClinicPatients.prototype.read);
        this.router.delete('/deletePatient/:id', auth_middleware_1.authMiddleware.checkAuthentication, deletePatientById_1.DeleteUserPatient.prototype.delete);
        this.router.post('/registerPatient', auth_middleware_1.authMiddleware.checkAuthentication, registerPatient_1.RegisterPatient.prototype.create);
        this.router.put('/updatePatient/:id', auth_middleware_1.authMiddleware.checkAuthentication, updatePatientInfo_1.UpdatePatientInfo.prototype.update);
        this.router.put('/uploadClinicHistory/:id', auth_middleware_1.authMiddleware.checkAuthentication, storage_1.upload, updateClinicHistory_1.UpdateClinicHistory.prototype.upload);
        this.router.put('/uploadOdontogram/:id', auth_middleware_1.authMiddleware.checkAuthentication, storage_1.upload, updateOdontogram_1.UpdateOdontogram.prototype.upload);
        this.router.put('/uploadConsent/:id', auth_middleware_1.authMiddleware.checkAuthentication, storage_1.upload, updateConsent_1.UpdateConsent.prototype.upload);
        this.router.put('/deleteClinicHistory/:id', auth_middleware_1.authMiddleware.checkAuthentication, updateClinicHistory_1.UpdateClinicHistory.prototype.delete);
        this.router.put('/deleteOdontogram/:id', auth_middleware_1.authMiddleware.checkAuthentication, updateOdontogram_1.UpdateOdontogram.prototype.delete);
        this.router.put('/deleteConsent/:id', auth_middleware_1.authMiddleware.checkAuthentication, updateConsent_1.UpdateConsent.prototype.delete);
        return this.router;
    }
    doctorActions() {
        this.router.post('/doctor/registerDoctor', auth_middleware_1.authMiddleware.checkAuthentication, registerDoctor_1.RegisterDoctor.prototype.create);
        this.router.get('/doctor/getClinicDoctors', auth_middleware_1.authMiddleware.checkAuthentication, getClinicDoctors_1.GetClinicDoctors.prototype.read);
        this.router.delete('/doctor/deleteClinicDoctor/:id', auth_middleware_1.authMiddleware.checkAuthentication, deletDoctorById_1.DeleteUserDoctor.prototype.delete);
        this.router.put('/doctor/updateClinicDoctorProfileImage/:id', auth_middleware_1.authMiddleware.checkAuthentication, updateDoctor_1.UpdateDoctor.prototype.updateProfileById);
        return this.router;
    }
    appointmentActions() {
        this.router.post('/appointment/registerAppointment', auth_middleware_1.authMiddleware.checkAuthentication, Appointment_1.Appointment.prototype.create);
        this.router.get('/appointment/getClinicAppointments', auth_middleware_1.authMiddleware.checkAuthentication, getClinicAppointments_1.GetClinicAppointments.prototype.read);
        this.router.delete('/appointment/deleteClinicAppointment/:id', auth_middleware_1.authMiddleware.checkAuthentication, deleteAppointmentById_1.DeleteAppointment.prototype.delete);
        this.router.post('/appointment/deleteManyClinicAppointments', auth_middleware_1.authMiddleware.checkAuthentication, deleteManyAppointmentsById_1.DeleteManyAppointments.prototype.delete);
        this.router.get('/appointment/getClinicAppointment/:id', auth_middleware_1.authMiddleware.checkAuthentication, getAppointmentById_1.GetClinicAppointmentById.prototype.read);
        return this.router;
    }
}
exports.clinicAuthActionsRoutes = new ClinicAuthActionsRoutes();
//# sourceMappingURL=clinicActions.js.map