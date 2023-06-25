"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRoutesClinic = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("@helpers/middlewares/auth-middleware");
const currentUser_1 = require("@clinic/auth/controllers/currentUser");
class CurrentUserRoutesClinic {
    constructor() {
        this.router = express_1.default.Router();
    }
    currentUserRoute() {
        // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
        // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
        this.router.get('/currentUser', auth_middleware_1.authMiddleware.checkAuthentication, currentUser_1.CurrentUser.prototype.read);
        return this.router;
    }
}
exports.currentUserRoutesClinic = new CurrentUserRoutesClinic();
//# sourceMappingURL=currentUser.js.map