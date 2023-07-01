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
exports.CurrentUser = void 0;
const patientUser_cache_1 = require("@services/redis/patientUser.cache");
const patientUser_service_1 = require("@services/db/patientUser.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const userCache = new patientUser_cache_1.UserCache();
class CurrentUser {
    read(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let isUser = false;
            let token = null;
            let user = null;
            const cachedUser = (yield userCache.getUserFromCache(`${req.currentUser.userId}`));
            const existingUser = (cachedUser
                ? cachedUser
                : yield patientUser_service_1.userService.getUserById(`${req.currentUser.userId}`));
            if (Object.keys(existingUser).length) {
                isUser = true;
                token = (_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt;
                user = existingUser;
            }
            res.status(http_status_codes_1.default.OK).json({ token, isUser, user });
        });
    }
}
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=currentUser.js.map