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
exports.SignUp = void 0;
const mongodb_1 = require("mongodb");
const joi_validation_decorators_1 = require("../../../../shared/globals/decorators/joi-validation.decorators");
const signup_1 = require("../../auth/schemes/signup");
const clinicAuth_service_1 = require("../../../../shared/globals/services/db/clinicAuth.service");
const clinicUser_cache_1 = require("../../../../shared/globals/services/redis/clinicUser.cache");
const badRequestError_1 = require("../../../../shared/globals/helpers/errors/badRequestError");
const generators_1 = require("../../../../shared/globals/helpers/generators/generators");
const lodash_1 = require("lodash");
const clinicUser_queue_1 = require("../../../../shared/globals/services/queues/clinicUser.queue");
const clinicAuth_queue_1 = require("../../../../shared/globals/services/queues/clinicAuth.queue");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const signup_utility_1 = require("./utilities/signup.utility");
const userCache = new clinicUser_cache_1.UserCache();
class SignUp extends signup_utility_1.SignUpUtility {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const checkIfUserExist = yield clinicAuth_service_1.authService.getUserByUsernameOrEmail(username, email);
            if (checkIfUserExist) {
                throw new badRequestError_1.BadRequestError('Invalid credentials for this user');
            }
            const authObjectId = new mongodb_1.ObjectId();
            const userObjectId = new mongodb_1.ObjectId();
            const uId = `${generators_1.Generators.generateRandomIntegers(12)}`;
            const passwordHash = yield generators_1.Generators.hash(password);
            const authData = SignUp.prototype.signUpData({
                _id: authObjectId,
                uId,
                username,
                email,
                password: passwordHash,
            });
            //const result: UploadApiResponse = (await uploads(avatarImage, `${userObjectId}`)) as UploadApiResponse;
            //if (!result?.public_id) {
            //  throw new BadRequestError('File upload: Error ocurred. Try again.');
            //}
            const userDataForCache = SignUp.prototype.userData(authData, userObjectId);
            //userDataForCache.profilePicture = `${config.CLOUD_DOMAIN}/${config.CLOUD_NAME}/image/upload/v${result.version}/${userObjectId}`;
            yield userCache.saveToUserCache(`${userObjectId}`, uId, userDataForCache);
            (0, lodash_1.omit)(userDataForCache, ['uId', 'username', 'email', 'password']);
            clinicAuth_queue_1.authQueue.addAuthUserJob('addAuthUserClinicToDB', { value: userDataForCache });
            clinicUser_queue_1.userQueue.addUserJob('addUserClinicToDB', { value: userDataForCache });
            const userJwt = SignUp.prototype.signToken(authData, userObjectId);
            req.session = { jwt: userJwt };
            res
                .status(http_status_codes_1.default.CREATED)
                .json({ message: 'User created succesfully', user: userDataForCache, token: userJwt });
        });
    }
}
__decorate([
    (0, joi_validation_decorators_1.joiValidation)(signup_1.signupSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignUp.prototype, "create", null);
exports.SignUp = SignUp;
//# sourceMappingURL=signup.js.map