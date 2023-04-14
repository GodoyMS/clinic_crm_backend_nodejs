"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../../shared/globals/helpers/middlewares/auth-middleware");
const currentUser_1 = require("../../auth/controllers/currentUser");
class CurrentUserRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        this.router.get('/currentUser', auth_middleware_1.authMiddleware.checkAuthentication, currentUser_1.CurrentUser.prototype.read);
        return this.router;
    }
}
exports.currentUserRoutes = new CurrentUserRoutes();
//# sourceMappingURL=currentUser.js.map