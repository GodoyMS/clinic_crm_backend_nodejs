"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUtility = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configEnvs_1 = require("../../../../../configs/configEnvs");
const generators_1 = require("../../../../../shared/globals/helpers/generators/generators");
class SignUpUtility {
    signToken(data, userObjectId) {
        return jsonwebtoken_1.default.sign({
            userId: userObjectId,
            uId: data.uId,
            email: data.email,
            username: data.username
        }, configEnvs_1.config.JWT_TOKEN);
    }
    signUpData(data) {
        const { _id, email, uId, username, password } = data;
        return {
            _id,
            uId,
            username,
            email: generators_1.Generators.lowerCase(email),
            password,
            createdAt: new Date()
        };
    }
    userData(data, userObjectId) {
        const { _id, email, uId, username, password, } = data;
        return {
            _id: userObjectId,
            authId: _id,
            uId,
            username,
            email,
            password,
            patients: [],
            doctors: [],
            phone: '',
            appointments: [],
            location: {
                district: '',
                province: '',
                region: '',
                address: ''
            },
        };
    }
}
exports.SignUpUtility = SignUpUtility;
//# sourceMappingURL=signup.utility.js.map