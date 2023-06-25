"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueue = void 0;
const base_queue_1 = require("./base.queue");
const patientAuth_worker_1 = require("@workers/patientAuth.worker");
class AuthQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('authPatient');
        this.processJob('addAuthUserPatientToDB', 5, patientAuth_worker_1.patientAuthWorker.addAuthUserToDB);
    }
    addAuthUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.authQueue = new AuthQueue();
//# sourceMappingURL=patientAuth.queue.js.map