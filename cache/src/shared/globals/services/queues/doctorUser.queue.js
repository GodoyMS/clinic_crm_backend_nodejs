"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueue = void 0;
const base_queue_1 = require("./base.queue");
const doctorUser_worker_1 = require("../../workers/doctorUser.worker");
class UserQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('userDoctor');
        this.processJob('addUserDoctorToDB', 5, doctorUser_worker_1.doctorUserWorker.addUserToDB);
    }
    addUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.userQueue = new UserQueue();
//# sourceMappingURL=doctorUser.queue.js.map