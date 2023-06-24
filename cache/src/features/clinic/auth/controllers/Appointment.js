"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const mongodb_1 = require("mongodb");
const clinicUser_service_1 = require("../../../../shared/globals/services/db/clinicUser.service");
const doctorUser_service_1 = require("../../../../shared/globals/services/db/doctorUser.service");
const patientUser_service_1 = require("../../../../shared/globals/services/db/patientUser.service");
const badRequestError_1 = require("../../../../shared/globals/helpers/errors/badRequestError");
const clinicUser_cache_1 = require("../../../../shared/globals/services/redis/clinicUser.cache");
const appointment_utility_1 = require("./utilities/appointment.utility");
const appointment_queue_1 = require("../../../../shared/globals/services/queues/appointment.queue");
const userCache = new clinicUser_cache_1.UserCache();
class Appointment extends appointment_utility_1.AppointmentUtility {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reason, doctorID, patientID, dateStart, dateEnd } = req.body;
            const { userId } = req.currentUser;
            const existingUser = yield clinicUser_service_1.userService.getUserDocById(userId);
            if (!existingUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            const existingDoctor = yield doctorUser_service_1.userService.getUserDocById(doctorID);
            if (!existingDoctor) {
                throw new badRequestError_1.BadRequestError('Invalid doctor');
            }
            const existingPatient = yield patientUser_service_1.userService.getUserDocById(patientID);
            if (!existingPatient) {
                throw new badRequestError_1.BadRequestError('Invalid Patient');
            }
            const appointmentObjectId = new mongodb_1.ObjectId();
            const appointmentDoc = Appointment.prototype.registerAppointment({
                _id: appointmentObjectId,
                clinic: existingUser.id,
                doctor: existingDoctor.id,
                patient: existingPatient.id,
                reason: reason,
                dateStart,
                dateEnd,
            });
            appointment_queue_1.appointmentQueue.addAppointmentJob('addAppointmentToDB', { value: appointmentDoc });
            res.status(http_status_codes_1.default.OK).json({
                message: 'Appointment succesfully created',
                appointment: appointmentDoc
            });
        });
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=Appointment.js.map