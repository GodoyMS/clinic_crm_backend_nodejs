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
exports.UpdateDoctor = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const doctorUser_service_1 = require("@services/db/doctorUser.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const doctorUser_cache_1 = require("@services/redis/doctorUser.cache");
const mongodb_1 = require("mongodb");
const cloudinaryUploads_1 = require("@helpers/cloudinary/cloudinaryUploads");
const deleteCloudinaryFileByURL_1 = require("@helpers/cloudinary/deleteCloudinaryFileByURL");
const userCache = new doctorUser_cache_1.UserCache();
class UpdateDoctor {
    updateProfileById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorID = req.params.id;
            const { profileImage } = req.body;
            const objectFile = new mongodb_1.ObjectId();
            if (!profileImage) {
                throw new badRequestError_1.BadRequestError('No image provided');
            }
            //Delete image from cloudinary
            const existingDoctorForImageDeletion = yield doctorUser_service_1.userService.getUserDocById(doctorID);
            if (!existingDoctorForImageDeletion) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            try {
                yield (0, deleteCloudinaryFileByURL_1.deleteFile)(existingDoctorForImageDeletion.profileImage);
            }
            catch (error) {
                throw new badRequestError_1.BadRequestError('Could not delete file from cloudinary');
            }
            const imageResult = (yield (0, cloudinaryUploads_1.uploads)(profileImage, `${objectFile}`));
            if (!(imageResult === null || imageResult === void 0 ? void 0 : imageResult.public_id)) {
                throw new badRequestError_1.BadRequestError('File upload: Error ocurred. Try again.');
            }
            const existingDoctorForCache = yield doctorUser_service_1.userService.updateProfileImageById(doctorID, `${imageResult.secure_url}`);
            yield existingDoctorForCache.save();
            yield userCache.updateInfoAndSaveToUserCache(`${existingDoctorForCache._id}`, existingDoctorForCache);
            // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
            // const existingPatientFromCache: IUserDocumentPatient = cachedUser
            //    ? cachedUser
            //    : await userServicePatient.getUserById(patientID);
            res.status(http_status_codes_1.default.OK).json({ message: 'Doctor profile updated succesfully ', doctor: existingDoctorForCache });
        });
    }
}
exports.UpdateDoctor = UpdateDoctor;
//# sourceMappingURL=updateDoctor.js.map