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
exports.clinicActionsService = void 0;
const auth_schema_1 = require("@clinic/auth/models/auth.schema");
const user_schema_1 = require("@patient/user/models/user.schema");
const user_schema_2 = require("@doctor/user/models/user.schema");
const generators_1 = require("@helpers/generators/generators");
const appointment_schema_1 = require("@root/features/appointment/model/appointment.schema");
class ClinicActionsService {
    getAuthClinicByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const clinic = (yield auth_schema_1.AuthModel.findOne({ email: email }).exec());
            return clinic;
        });
    }
    updateClinicAuth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
    getAllPatientsWithClinicId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = (yield user_schema_1.UserModel.find({ clinic: id }));
            return patients;
        });
    }
    getAllDoctorsWithClinicId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctors = (yield user_schema_2.UserModel.find({ clinic: id }).populate('clinic').exec());
            return doctors;
        });
    }
    getAllAppointmentsWithClinicId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctors = (yield appointment_schema_1.AppointmentModel.find({ clinic: id }).populate('patient').populate('doctor').exec());
            return doctors;
        });
    }
    getAppointmentById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = (yield appointment_schema_1.AppointmentModel.findById(data._id).populate('patient').populate('doctor').exec());
            return appointment;
        });
    }
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
}
exports.clinicActionsService = new ClinicActionsService();
//# sourceMappingURL=clinicActions.js.map