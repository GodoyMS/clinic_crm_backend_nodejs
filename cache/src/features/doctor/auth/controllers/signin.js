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
exports.SignIn = void 0;
const configEnvs_1 = require("@configs/configEnvs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_validation_decorators_1 = require("@decorators/joi-validation.decorators");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const doctorAuth_service_1 = require("@services/db/doctorAuth.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const signin_1 = require("@doctor/auth/schemes/signin");
class SignIn {
    static compare(existingUserCompare, passwordInput) {
        const { password } = existingUserCompare;
        const doesPasswordMatch = password === passwordInput;
        return doesPasswordMatch;
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, password, } = req.body;
            const existingUser = yield doctorAuth_service_1.authService.getAuthUserByDni(dni);
            console.log(existingUser);
            if (!existingUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials user not found');
            }
            const passwordMatch = yield SignIn.compare(existingUser, password);
            if (!passwordMatch) {
                throw new badRequestError_1.BadRequestError('Invalid credentials password not match');
            }
            const userJwt = jsonwebtoken_1.default.sign({
                userId: existingUser._id,
                uId: existingUser.uId,
                dni: existingUser.dni
            }, configEnvs_1.config.JWT_TOKEN);
            req.session = { jwt: userJwt };
            res.status(http_status_codes_1.default.OK).json({ message: 'Doctor login successfully', user: existingUser, token: userJwt });
        });
    }
}
__decorate([
    (0, joi_validation_decorators_1.joiValidation)(signin_1.loginSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignIn.prototype, "read", null);
exports.SignIn = SignIn;
//# sourceMappingURL=signin.js.map