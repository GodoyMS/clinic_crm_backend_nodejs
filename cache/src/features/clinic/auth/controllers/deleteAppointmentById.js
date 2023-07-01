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
exports.DeleteAppointment = void 0;
const clinicUser_service_1 = require("@services/db/clinicUser.service");
const appointment_service_1 = require("@services/db/appointment.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const badRequestError_1 = require("@helpers/errors/badRequestError");
class DeleteAppointment {
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentID = req.params.id;
            const { userId } = req.currentUser;
            const existingUser = yield clinicUser_service_1.userService.getUserDocById(userId);
            if (!existingUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            const existingDeletedAppointment = yield appointment_service_1.appointmentService.deleteAppointmentByID(appointmentID);
            if (!existingDeletedAppointment) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            res.status(http_status_codes_1.default.OK).json({
                message: 'Appointment was succesfully deleted',
                deletedAppointment: existingDeletedAppointment,
            });
        });
    }
}
exports.DeleteAppointment = DeleteAppointment;
//# sourceMappingURL=deleteAppointmentById.js.map