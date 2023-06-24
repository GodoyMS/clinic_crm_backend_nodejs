"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueue = void 0;
const base_queue_1 = require("./base.queue");
const clinicAuth_worker_1 = require("../../workers/clinicAuth.worker");
class AuthQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('authClinic');
        this.processJob('addAuthUserClinicToDB', 5, clinicAuth_worker_1.clinicAuthWorker.addAuthUserToDB);
    }
    addAuthUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.authQueue = new AuthQueue();
//# sourceMappingURL=clinicAuth.queue.js.map