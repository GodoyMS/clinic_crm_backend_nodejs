"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUtility = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configEnvs_1 = require("../../../../../configs/configEnvs");
class SignUpUtility {
    signToken(data, userObjectId) {
        return jsonwebtoken_1.default.sign({
            userId: userObjectId,
            uId: data.uId,
            dni: data.dni,
            names: data.names
        }, configEnvs_1.config.JWT_TOKEN);
    }
    signUpData(data) {
        const { _id, clinicId, job, uId, dni, names, password } = data;
        return {
            _id,
            clinicId,
            uId,
            job,
            dni,
            names,
            password,
            createdAt: new Date()
        };
    }
    userData(data, userObjectId) {
        const { _id, clinicId, uId, dni, names, password, } = data;
        return {
            _id: userObjectId,
            authId: _id,
            uId,
            dni,
            clinic: clinicId,
            password,
            phone: '',
            names,
            age: '',
            city: '',
            sex: '',
        };
    }
}
exports.SignUpUtility = SignUpUtility;
//# sourceMappingURL=signup.utility.js.map