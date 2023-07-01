"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutesClinic = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("@clinic/auth/controllers/signup");
const signin_1 = require("@clinic/auth/controllers/signin");
const signout_1 = require("@clinic/auth/controllers/signout");
const deleteClinic_1 = require("../controllers/deleteClinic");
const auth_middleware_1 = require("@helpers/middlewares/auth-middleware");
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    signInSingUpRoutes() {
        // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
        // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
        this.router.post('/signup', signup_1.SignUp.prototype.create);
        this.router.post('/signin', signin_1.SignIn.prototype.read);
        return this.router;
    }
    signoutRoute() {
        this.router.get('/signout', signout_1.SignOut.prototype.update);
        return this.router;
    }
    deleteClinicRoute() {
        this.router.delete('/deleteClinic', auth_middleware_1.authMiddleware.checkAuthentication, deleteClinic_1.DeleteUserClinic.prototype.delete);
        return this.router;
    }
}
exports.authRoutesClinic = new AuthRoutes();
//# sourceMappingURL=authRoutes.js.map