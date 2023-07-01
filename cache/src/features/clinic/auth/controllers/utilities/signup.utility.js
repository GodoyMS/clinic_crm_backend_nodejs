"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUtility = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configEnvs_1 = require("@configs/configEnvs");
const generators_1 = require("@helpers/generators/generators");
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
    signUpPatient(data) {
        const { _id, clinicId, uId, dni, names, password } = data;
        return {
            _id,
            clinicId,
            uId,
            dni,
            names,
            password,
            createdAt: new Date()
        };
    }
    signUpDoctor(data) {
        const { _id, clinicId, uId, dni, job, names, password } = data;
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
        const { _id, email, uId, username, password } = data;
        return {
            _id: userObjectId,
            authId: _id,
            uId,
            username,
            specialty: '',
            email,
            password,
            phone: '',
            location: {
                district: '',
                province: '',
                region: '',
                address: ''
            },
        };
    }
    patientData(data, userObjectId) {
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
            clinicHistory: [],
            odontogram: [],
            consent: [],
        };
    }
    doctorData(data, userObjectId) {
        const { _id, clinicId, uId, dni, names, password, job } = data;
        return {
            _id: userObjectId,
            authId: _id,
            uId,
            dni,
            clinic: clinicId,
            email: '',
            password,
            profileImage: '',
            job,
            phone: '',
            names,
            age: '',
            city: '',
            sex: '',
            joinedAt: null
        };
    }
}
exports.SignUpUtility = SignUpUtility;
//# sourceMappingURL=signup.utility.js.map