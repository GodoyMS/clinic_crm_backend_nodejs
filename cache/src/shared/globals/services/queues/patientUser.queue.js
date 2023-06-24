"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueue = void 0;
const base_queue_1 = require("./base.queue");
const patientUser_worker_1 = require("../../workers/patientUser.worker");
class UserQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('userPatient');
        this.processJob('addUserPatientToDB', 5, patientUser_worker_1.patientUserWorker.addUserToDB);
    }
    addUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.userQueue = new UserQueue();
//# sourceMappingURL=patientUser.queue.js.map