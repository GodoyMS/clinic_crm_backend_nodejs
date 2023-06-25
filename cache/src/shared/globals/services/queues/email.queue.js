"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const base_queue_1 = require("./base.queue");
const email_worker_1 = require("@workers/email.worker");
class EmailQueue extends base_queue_1.BaseQueue {
    constructor() {
        super('emails');
        this.processJob('forgotPasswordEmai', 5, email_worker_1.emailWorker.addNotificationEmail);
    }
    addEmailJob(name, data) {
        //
        this.addJob(name, data);
    }
}
exports.emailQueue = new EmailQueue();
//# sourceMappingURL=email.queue.js.map