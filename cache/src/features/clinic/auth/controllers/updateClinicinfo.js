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
exports.UpdateClinicInfo = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const clinicUser_service_1 = require("@services/db/clinicUser.service");
const badRequestError_1 = require("@helpers/errors/badRequestError");
const clinicUser_cache_1 = require("@services/redis/clinicUser.cache");
const userCache = new clinicUser_cache_1.UserCache();
class UpdateClinicInfo {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { specialty, phone, location } = req.body;
            const { userId } = req.currentUser;
            const serializedLocation = JSON.stringify(location);
            const existingUser = yield clinicUser_service_1.userService.getUserDocById(userId);
            if (!existingUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            existingUser.set({ specialty, phone, location });
            yield existingUser.save();
            yield userCache.updateAFieldUserInCache(`${userId}`, 'specialty', `${specialty}`);
            yield userCache.updateAFieldUserInCache(`${userId}`, 'phone', `${phone}`);
            yield userCache.updateAFieldUserInCache(`${userId}`, 'location', `${serializedLocation}`);
            const cachedUser = (yield userCache.getUserFromCache(userId));
            const existingUserFromCache = cachedUser
                ? cachedUser
                : yield clinicUser_service_1.userService.getUserById(userId);
            res.status(http_status_codes_1.default.OK).json({ message: 'Clinic info data succesfully updated', user: existingUserFromCache });
        });
    }
}
exports.UpdateClinicInfo = UpdateClinicInfo;
//# sourceMappingURL=updateClinicinfo.js.map