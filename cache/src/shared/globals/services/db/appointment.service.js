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
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentService = void 0;
const appointment_schema_1 = require("@root/features/appointment/model/appointment.schema");
class AppointmentService {
    createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield appointment_schema_1.AppointmentModel.create(data);
        });
    }
    deleteAppointmentByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAppointment = (yield appointment_schema_1.AppointmentModel.findByIdAndDelete(id).exec());
            return deletedAppointment;
        });
    }
    deleteManyAppointmentsBydId(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (appointment_schema_1.AppointmentModel.deleteMany({ _id: { $in: ids } }));
        });
    }
    getAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = (yield appointment_schema_1.AppointmentModel.findById(id).populate('doctor').populate('patient').exec());
            return appointment;
        });
    }
}
exports.appointmentService = new AppointmentService();
//# sourceMappingURL=appointment.service.js.map