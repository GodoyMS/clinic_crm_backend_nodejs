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
exports.patientAuthWorker = void 0;
const configLogs_1 = require("@configs/configLogs");
const patientAuth_service_1 = require("@services/db/patientAuth.service");
const log = configLogs_1.logger.createLogger('authPatientWorker');
class PatientAuthWorker {
    addAuthUserToDB(job, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value } = job.data;
                yield patientAuth_service_1.authService.createAuthUser(value);
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
exports.patientAuthWorker = new PatientAuthWorker();
//# sourceMappingURL=patientAuth.worker.js.map