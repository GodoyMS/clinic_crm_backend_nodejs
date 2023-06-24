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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserPatient = void 0;
const patientUser_service_1 = require("../../../../shared/globals/services/db/patientUser.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const patientUser_cache_1 = require("../../../../shared/globals/services/redis/patientUser.cache");
const badRequestError_1 = require("../../../../shared/globals/helpers/errors/badRequestError");
const userCache = new patientUser_cache_1.UserCache();
class DeleteUserPatient {
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientID = req.params.id;
            const existingPatient = yield patientUser_service_1.userService.deleteUserDocById(patientID);
            if (!existingPatient) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            const existingPatientAuth = yield patientUser_service_1.userService.deleteUserAuthById(patientID);
            if (!existingPatientAuth) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            yield userCache.deleteAUserCache(patientID);
            res.status(http_status_codes_1.default.OK).json({ message: 'Patient  data was succesfully deleted' });
        });
    }
}
exports.DeleteUserPatient = DeleteUserPatient;
//# sourceMappingURL=deletePatientById.js.map