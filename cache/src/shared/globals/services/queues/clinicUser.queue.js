"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueue = void 0;
const base_queue_1 = require("./base.queue");
const clinicUser_worker_1 = require("../../workers/clinicUser.worker");
class UserQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('userClinic');
        this.processJob('addUserClinicToDB', 5, clinicUser_worker_1.userWorker.addUserToDB);
    }
    addUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.userQueue = new UserQueue();
//# sourceMappingURL=clinicUser.queue.js.map