"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentUtility = void 0;
class AppointmentUtility {
    registerAppointment(data) {
        const { _id, clinic, doctor, patient, dateStart, dateEnd, reason } = data;
        return {
            _id,
            clinic,
            doctor,
            patient,
            dateStart,
            dateEnd,
            reason
        };
    }
}
exports.AppointmentUtility = AppointmentUtility;
//# sourceMappingURL=appointment.utility.js.map