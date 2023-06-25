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
exports.DeleteUserClinic = void 0;
const clinicUser_cache_1 = require("@services/redis/clinicUser.cache");
const clinicUser_service_1 = require("@services/db/clinicUser.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const badRequestError_1 = require("@helpers/errors/badRequestError");
const userCache = new clinicUser_cache_1.UserCache();
class DeleteUserClinic {
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.currentUser;
            const existingUser = yield clinicUser_service_1.userService.getUserDocById(userId);
            if (!existingUser) {
                throw new badRequestError_1.BadRequestError('Invalid credentials');
            }
            existingUser.delete();
            yield userCache.deleteAUserCache(userId);
            res.status(http_status_codes_1.default.OK).json({ message: 'Clinic  data was succesfully deleted' });
        });
    }
}
exports.DeleteUserClinic = DeleteUserClinic;
//# sourceMappingURL=deleteClinic.js.map