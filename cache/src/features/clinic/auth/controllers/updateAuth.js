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
exports.UpdateAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const clinicAuth_service_1 = require("@services/db/clinicAuth.service");
const clinicUser_service_1 = require("@services/db/clinicUser.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const generators_1 = require("@helpers/generators/generators");
const clinicUser_cache_1 = require("@services/redis/clinicUser.cache");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userCache = new clinicUser_cache_1.UserCache();
class UpdateAuth {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username } = req.body;
            const { userId } = req.currentUser;
            const existingAuthUser = yield clinicAuth_service_1.authService.getAuthUserById(userId);
            const existingUser = yield clinicUser_service_1.userService.getUserDocById(userId);
            if (!existingAuthUser || !existingUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            existingUser.set({ email, username });
            existingAuthUser.set({ email, username });
            yield existingAuthUser.save();
            yield existingUser.save();
            yield userCache.updateAFieldUserInCache(`${userId}`, 'email', `${email}`);
            yield userCache.updateAFieldUserInCache(`${userId}`, 'username', `${username}`);
            const cachedUser = (yield userCache.getUserFromCache(userId));
            const existingUserFromCache = cachedUser
                ? cachedUser
                : yield clinicUser_service_1.userService.getUserById(userId);
            res.status(http_status_codes_1.default.OK).json({ message: 'Clinic auth data succesfully updated', user: existingUserFromCache });
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword } = req.body;
            const { userId } = req.currentUser;
            const existingAuthUser = yield clinicAuth_service_1.authService.getAuthUserById(userId);
            const passwordAccess = bcryptjs_1.default.compare(currentPassword, existingAuthUser.password);
            if (yield !passwordAccess) {
                throw new badRequestError_1.BadRequestError('Invalid current password');
            }
            if (!existingAuthUser) {
                throw new badRequestError_1.BadRequestError('Invalid password');
            }
            const hashedPassword = generators_1.Generators.hash(newPassword);
            existingAuthUser.set({ password: hashedPassword });
            yield existingAuthUser.save();
            res.status(http_status_codes_1.default.OK).json({ message: 'Clinic password changed succesfully' });
        });
    }
    getAuthData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.currentUser;
            const existingAuthUser = yield clinicAuth_service_1.authService.getAuthUserById(userId);
            if (!existingAuthUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            res.status(http_status_codes_1.default.OK).json({ message: 'Succes getting authData', authData: existingAuthUser });
        });
    }
}
exports.UpdateAuth = UpdateAuth;
//# sourceMappingURL=updateAuth.js.map