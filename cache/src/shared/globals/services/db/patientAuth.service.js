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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const auth_schema_1 = require("../../../../features/patient/auth/models/auth.schema");
const generators_1 = require("../../helpers/generators/generators");
class AuthService {
    createAuthUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_schema_1.AuthModel.create(data);
        });
    }
    getUserByUsernameOrEmail(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                $or: [{ username: generators_1.Generators.firstLetterUppercase(username) }, { email: generators_1.Generators.lowerCase(email) }]
            };
            const user = (yield auth_schema_1.AuthModel.findOne(query).exec());
            return user;
        });
    }
    getAuthUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield auth_schema_1.AuthModel.findOne({ username }).exec());
            return user;
        });
    }
    getAuthUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield auth_schema_1.AuthModel.findOne({ email }).exec());
            return user;
        });
    }
    getAuthUserByDni(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPatient = (yield auth_schema_1.AuthModel.findOne({ dni }).exec());
            return userPatient;
        });
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=patientAuth.service.js.map