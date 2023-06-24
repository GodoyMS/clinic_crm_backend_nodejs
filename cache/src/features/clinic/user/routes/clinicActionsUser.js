"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicUserActionsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../../shared/globals/helpers/middlewares/auth-middleware");
const updateProfile_1 = require("../../user/controllers/updateProfile");
class ClinicUserActionsRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    updateClinicInfoRoute() {
        // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
        // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
        this.router.put('/updateClinicInfo', auth_middleware_1.authMiddleware.checkAuthentication, updateProfile_1.UpdateClinicInfo.prototype.update);
        return this.router;
    }
}
exports.clinicUserActionsRoutes = new ClinicUserActionsRoutes();
//# sourceMappingURL=clinicActionsUser.js.map