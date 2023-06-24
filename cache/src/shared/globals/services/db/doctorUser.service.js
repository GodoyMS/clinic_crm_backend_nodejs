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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const auth_schema_1 = require("../../../../features/doctor/auth/models/auth.schema");
const user_schema_1 = require("../../../../features/doctor/user/models/user.schema");
const mongoose_1 = __importDefault(require("mongoose"));
class UserService {
    addUserData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_schema_1.UserModel.create(data);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_schema_1.UserModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
                { $lookup: { from: 'AuthPatient', localField: 'authId', foreignField: '_id', as: 'authId' } },
                { $unwind: '$authId' },
                { $project: this.aggregateProject() },
            ]);
            return users[0];
        });
    }
    getUserDocById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_schema_1.UserModel.findOne({ _id: id }).exec());
            return user;
        });
    }
    deleteUserDocById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_schema_1.UserModel.findByIdAndRemove(id).exec());
            return user;
        });
    }
    getUserAuthById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const authPatient = (yield auth_schema_1.AuthModel.findOne({ _id: id }).exec());
            return authPatient;
        });
    }
    deleteUserAuthById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const authPatient = (yield auth_schema_1.AuthModel.findByIdAndRemove(id).exec());
            return authPatient;
        });
    }
    getUserByIdWithPopulate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_schema_1.UserModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(userId) }).populate('authId', { dni: 0, email: 0 }));
            return user;
        });
    }
    aggregateProject() {
        return {
            _id: 1,
            username: '$authId.username',
            uId: '$authId.uId',
            email: '$authId.email',
            phone: 1,
            names: 1,
            age: 1,
            sex: 1,
        };
    }
}
exports.userService = new UserService();
//# sourceMappingURL=doctorUser.service.js.map