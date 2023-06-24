"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleWare = exports.UploadMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configEnvs_1 = require("../../../../configs/configEnvs");
const notAuthorizedError_1 = require("../errors/notAuthorizedError");
class UploadMiddleWare {
    verifyUser(req, _res, next) {
        var _a, _b;
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
            throw new notAuthorizedError_1.NotAuthorizedError('Token is not available. Please login again.');
        }
        try {
            const payload = jsonwebtoken_1.default.verify((_b = req.session) === null || _b === void 0 ? void 0 : _b.jwt, configEnvs_1.config.JWT_TOKEN);
            req.currentUser = payload;
        }
        catch (error) {
            throw new notAuthorizedError_1.NotAuthorizedError('Token is invalid. Please login again in verify user.');
        }
        next();
    }
    checkAuthentication(req, _res, next) {
        if (!req.currentUser) {
            throw new notAuthorizedError_1.NotAuthorizedError('Authentication is required to access this route in checkAuth.');
        }
        next();
    }
}
exports.UploadMiddleWare = UploadMiddleWare;
exports.uploadMiddleWare = new UploadMiddleWare();
//# sourceMappingURL=uploadDoc-middleware.js.map