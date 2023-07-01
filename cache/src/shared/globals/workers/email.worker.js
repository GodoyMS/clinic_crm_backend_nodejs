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
exports.emailWorker = exports.EmailWorker = void 0;
const mail_transport_1 = require("@services/email/mail.transport");
const configLogs_1 = require("@configs/configLogs");
const log = configLogs_1.logger.createLogger('Email worker');
class EmailWorker {
    addNotificationEmail(job, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { template, receiverEmail, subject } = job.data;
                yield mail_transport_1.mailTransport.sendMail(template, receiverEmail, subject);
                job.progress(100);
                done(null, job.data);
            }
            catch (error) {
                log.error(error);
                done(error);
            }
        });
    }
}
exports.EmailWorker = EmailWorker;
exports.emailWorker = new EmailWorker();
//# sourceMappingURL=email.worker.js.map