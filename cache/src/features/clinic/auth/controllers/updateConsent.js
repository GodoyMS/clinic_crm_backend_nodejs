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
exports.UpdateConsent = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const patientUser_service_1 = require("@services/db/patientUser.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const patientUser_cache_1 = require("@services/redis/patientUser.cache");
const cloudinaryUploads_1 = require("@helpers/cloudinary/cloudinaryUploads");
const mongodb_1 = require("mongodb");
const fs_1 = __importDefault(require("fs"));
const deleteCloudinaryFileByURL_1 = require("@helpers/cloudinary/deleteCloudinaryFileByURL");
const userCache = new patientUser_cache_1.UserCache();
class UpdateConsent {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientID = req.params.id;
            const file = req.file;
            const objectFile = new mongodb_1.ObjectId();
            if (!file) {
                throw new badRequestError_1.BadRequestError('No pdf provided');
            }
            const pdfResult = (yield (0, cloudinaryUploads_1.uploads)(file.path, `${objectFile}`));
            if (!(pdfResult === null || pdfResult === void 0 ? void 0 : pdfResult.public_id)) {
                throw new badRequestError_1.BadRequestError('File upload: Error ocurred. Try again.');
            }
            const existingPatient = yield patientUser_service_1.userService.updateConsentPatientById(patientID, `${pdfResult.secure_url}`);
            if (!existingPatient) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            else {
                fs_1.default.unlink(file.path, unlinkError => {
                    if (unlinkError) {
                        // Handle file deletion error
                        console.error(unlinkError);
                        return res.status(500).send('Failed to delete file from the server');
                    }
                    // File successfully uploaded to Cloudinary and deleted from the server
                });
            }
            yield existingPatient.save();
            // existingUser.set({ specialty, phone, location });
            yield userCache.updateInfoAndSaveToUserCache(`${existingPatient._id}`, existingPatient);
            // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
            // const existingPatientFromCache: IUserDocumentPatient = cachedUser
            //    ? cachedUser
            //    : await userServicePatient.getUserById(patientID);
            res.status(http_status_codes_1.default.OK).json({
                message: 'Patient consent added succesfully ',
                patient: existingPatient,
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientID = req.params.id;
            const { consentUrl } = req.body;
            try {
                yield (0, deleteCloudinaryFileByURL_1.deleteFile)(consentUrl);
            }
            catch (error) {
                throw new badRequestError_1.BadRequestError('Could not delete file from cloudinary');
            }
            const existingPatient = yield patientUser_service_1.userService.deleteConsentPatientById(patientID, `${consentUrl}`);
            if (!existingPatient) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            yield existingPatient.save();
            // existingUser.set({ specialty, phone, location });
            yield userCache.updateInfoAndSaveToUserCache(`${existingPatient._id}`, existingPatient);
            // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
            // const existingPatientFromCache: IUserDocumentPatient = cachedUser
            //    ? cachedUser
            //    : await userServicePatient.getUserById(patientID);
            res.status(http_status_codes_1.default.OK).json({
                message: 'Patient consent deleted succesfully ',
                patient: existingPatient,
            });
        });
    }
}
exports.UpdateConsent = UpdateConsent;
//# sourceMappingURL=updateConsent.js.map