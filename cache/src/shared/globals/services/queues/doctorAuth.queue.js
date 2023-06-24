"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueue = void 0;
const base_queue_1 = require("./base.queue");
const doctorAuth_worker_1 = require("../../workers/doctorAuth.worker");
class AuthQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('authDoctor');
        this.processJob('addAuthUserDoctorToDB', 5, doctorAuth_worker_1.doctorAuthWorker.addAuthUserToDB);
    }
    addAuthUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.authQueue = new AuthQueue();
//# sourceMappingURL=doctorAuth.queue.js.map