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
exports.RegisterDoctor = void 0;
const mongodb_1 = require("mongodb");
const doctorAuth_service_1 = require("@services/db/doctorAuth.service");
const doctorUser_cache_1 = require("@services/redis/doctorUser.cache");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const generators_1 = require("@helpers/generators/generators");
const lodash_1 = require("lodash");
const doctorUser_queue_1 = require("@services/queues/doctorUser.queue");
const doctorAuth_queue_1 = require("@services/queues/doctorAuth.queue");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const clinicUser_service_1 = require("@services/db/clinicUser.service");
const signup_utility_1 = require("./utilities/signup.utility");
const cloudinaryUploads_1 = require("@helpers/cloudinary/cloudinaryUploads");
const configEnvs_1 = require("@configs/configEnvs");
const userCache = new doctorUser_cache_1.UserCache();
class RegisterDoctor extends signup_utility_1.SignUpUtility {
    //   @joiValidation(signupSchema)
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, names, job, profileImage, sexo } = req.body;
            const checkIfUserExist = yield doctorAuth_service_1.authService.getAuthUserByDni(dni);
            if (checkIfUserExist) {
                throw new badRequestError_1.BadRequestError('Invalid credentials for this user');
            }
            const currentClinic = yield clinicUser_service_1.userService.getUserDocById(`${req.currentUser.userId}`);
            if (!currentClinic) {
                throw new badRequestError_1.BadRequestError('Invalid token');
            }
            const authObjectId = new mongodb_1.ObjectId();
            const userObjectId = new mongodb_1.ObjectId();
            const uId = `${generators_1.Generators.generateRandomIntegers(12)}`;
            const randomPassword = generators_1.Generators.generateRandomPassword(10);
            // const passwordHash = await Generators.hash(password); For later
            const authDataPatient = RegisterDoctor.prototype.signUpDoctor({
                _id: authObjectId,
                clinicId: currentClinic.id,
                uId,
                job,
                dni,
                names,
                password: randomPassword,
            });
            const userDataForCache = RegisterDoctor.prototype.doctorData(authDataPatient, userObjectId);
            if (profileImage && profileImage !== '') {
                const result = (yield (0, cloudinaryUploads_1.uploads)(profileImage, `${userObjectId}`));
                if (!(result === null || result === void 0 ? void 0 : result.public_id)) {
                    throw new badRequestError_1.BadRequestError('File upload: Error ocurred. Try again.');
                }
                userDataForCache.profileImage = `${configEnvs_1.config.CLOUD_DOMAIN}/${configEnvs_1.config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;
            }
            else {
                if (sexo === 'Mujer') {
                    userDataForCache.profileImage = 'https://cdn.midjourney.com/cb90dbf1-ee6b-421a-b580-7597604048eb/0_3.png';
                }
                else {
                    userDataForCache.profileImage = 'https://cdn.midjourney.com/e39468a9-7df0-4155-87f7-7c9b9d680731/0_2.png';
                }
            }
            userDataForCache.job = job;
            userDataForCache.sex = sexo;
            yield userCache.saveToUserCache(`${userObjectId}`, uId, userDataForCache);
            (0, lodash_1.omit)(userDataForCache, ['uId', 'username', 'email', 'password']);
            doctorAuth_queue_1.authQueue.addAuthUserJob('addAuthUserDoctorToDB', { value: userDataForCache });
            doctorUser_queue_1.userQueue.addUserJob('addUserDoctorToDB', { value: userDataForCache });
            res.status(http_status_codes_1.default.CREATED).json({ message: 'Doctor created succesfully', doctor: userDataForCache });
        });
    }
}
exports.RegisterDoctor = RegisterDoctor;
//# sourceMappingURL=registerDoctor.js.map