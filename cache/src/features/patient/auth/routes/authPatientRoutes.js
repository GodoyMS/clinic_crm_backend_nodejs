"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPatientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const signin_1 = require("../../auth/controllers/signin");
const signout_1 = require("../../auth/controllers/signout");
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
        // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
        //  this.router.post('/signup',authMiddleware.verifyUser, SignUpPatient.prototype.create);
        this.router.post('/signin', signin_1.SignIn.prototype.read);
        return this.router;
    }
    signoutRoute() {
        this.router.get('/signout', signout_1.SignOut.prototype.update);
        return this.router;
    }
}
exports.authPatientRoutes = new AuthRoutes();
//# sourceMappingURL=authPatientRoutes.js.map