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
exports.DeleteUserDoctor = void 0;
const doctorUser_service_1 = require("@services/db/doctorUser.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const doctorUser_cache_1 = require("@services/redis/doctorUser.cache");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const deleteCloudinaryFileByURL_1 = require("@helpers/cloudinary/deleteCloudinaryFileByURL");
const userCache = new doctorUser_cache_1.UserCache();
class DeleteUserDoctor {
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorID = req.params.id;
            const existingDoctor = yield doctorUser_service_1.userService.deleteUserDocById(doctorID);
            if (!existingDoctor) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            try {
                yield (0, deleteCloudinaryFileByURL_1.deleteFile)(existingDoctor.profileImage);
            }
            catch (error) {
                throw new badRequestError_1.BadRequestError('Could not delete file from cloudinary');
            }
            const existingAuthDoctor = yield doctorUser_service_1.userService.deleteUserAuthById(doctorID);
            if (!existingAuthDoctor) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            yield userCache.deleteAUserCache(doctorID);
            res.status(http_status_codes_1.default.OK).json({ message: 'Patient  data was succesfully deleted' });
        });
    }
}
exports.DeleteUserDoctor = DeleteUserDoctor;
//# sourceMappingURL=deletDoctorById.js.map