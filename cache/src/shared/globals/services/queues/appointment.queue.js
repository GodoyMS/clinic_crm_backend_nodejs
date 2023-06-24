"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentQueue = void 0;
const base_queue_1 = require("./base.queue");
const appointment_worker_1 = require("../../workers/appointment.worker");
class AppointmentQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('appointment');
        this.processJob('addAppointmentToDB', 5, appointment_worker_1.appointmentWorker.addAppointmentToDB);
    }
    addAppointmentJob(name, data) {
        this.addJob(name, data);
    }
}
exports.appointmentQueue = new AppointmentQueue();
//# sourceMappingURL=appointment.queue.js.map