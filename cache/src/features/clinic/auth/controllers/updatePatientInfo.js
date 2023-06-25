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
exports.UpdatePatientInfo = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const patientUser_service_1 = require("@services/db/patientUser.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const patientUser_cache_1 = require("@services/redis/patientUser.cache");
const userCache = new patientUser_cache_1.UserCache();
class UpdatePatientInfo {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedFields = req.body;
            const patientID = req.params.id;
            const existingPatient = yield patientUser_service_1.userService.getUserDocById(patientID);
            if (!existingPatient) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            existingPatient.set(updatedFields);
            yield existingPatient.save();
            // existingUser.set({ specialty, phone, location });
            yield userCache.updateInfoAndSaveToUserCache(`${existingPatient._id}`, existingPatient);
            // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
            // const existingPatientFromCache: IUserDocumentPatient = cachedUser
            //    ? cachedUser
            //    : await userServicePatient.getUserById(patientID);
            res.status(http_status_codes_1.default.OK).json({ message: 'Patient auth data succesfully updated', patient: existingPatient });
        });
    }
}
exports.UpdatePatientInfo = UpdatePatientInfo;
//# sourceMappingURL=updatePatientInfo.js.map