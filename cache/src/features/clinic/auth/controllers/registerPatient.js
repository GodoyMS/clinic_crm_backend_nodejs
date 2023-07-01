"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.RegisterPatient = void 0;
const mongodb_1 = require("mongodb");
const joi_validation_decorators_1 = require("@decorators/joi-validation.decorators");
const signup_1 = require("@patient/auth/schemes/signup");
const patientAuth_service_1 = require("@services/db/patientAuth.service");
const patientUser_cache_1 = require("@services/redis/patientUser.cache");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const generators_1 = require("@helpers/generators/generators");
const lodash_1 = require("lodash");
const patientUser_queue_1 = require("@services/queues/patientUser.queue");
const patientAuth_queue_1 = require("@services/queues/patientAuth.queue");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const clinicUser_service_1 = require("@services/db/clinicUser.service");
const signup_utility_1 = require("./utilities/signup.utility");
const userCache = new patientUser_cache_1.UserCache();
class RegisterPatient extends signup_utility_1.SignUpUtility {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, names, sex } = req.body;
            const checkIfUserExist = yield patientAuth_service_1.authService.getAuthUserByDni(dni);
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
            const authDataPatient = RegisterPatient.prototype.signUpPatient({
                _id: authObjectId,
                clinicId: currentClinic.id,
                uId,
                dni,
                names,
                password: randomPassword,
            });
            //const result: UploadApiResponse = (await uploads(avatarImage, `${userObjectId}`)) as UploadApiResponse;
            //if (!result?.public_id) {
            //  throw new BadRequestError('File upload: Error ocurred. Try again.');
            //}
            const userDataForCache = RegisterPatient.prototype.patientData(authDataPatient, userObjectId);
            userDataForCache.sex = sex;
            //userDataForCache.profilePicture = `${config.CLOUD_DOMAIN}/${config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;
            yield userCache.saveToUserCache(`${userObjectId}`, uId, userDataForCache);
            (0, lodash_1.omit)(userDataForCache, ['uId', 'username', 'email', 'password']);
            patientAuth_queue_1.authQueue.addAuthUserJob('addAuthUserPatientToDB', { value: userDataForCache });
            patientUser_queue_1.userQueue.addUserJob('addUserPatientToDB', { value: userDataForCache });
            res
                .status(http_status_codes_1.default.CREATED)
                .json({ message: 'Patient created succesfully', patient: userDataForCache });
        });
    }
}
__decorate([
    (0, joi_validation_decorators_1.joiValidation)(signup_1.signupSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RegisterPatient.prototype, "create", null);
exports.RegisterPatient = RegisterPatient;
//# sourceMappingURL=registerPatient.js.map