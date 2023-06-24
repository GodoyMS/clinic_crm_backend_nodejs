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
const user_schema_1 = require("../../../../features/clinic/user/models/user.schema");
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
                { $lookup: { from: 'AuthClinic', localField: 'authId', foreignField: '_id', as: 'authId' } },
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
            yield user_schema_1.UserModel.deleteOne({ _id: id }).exec();
        });
    }
    /*public async getUserByIdWithPopulate(userId: string): Promise<IUserDocument> {
      const user: IUserDocument = await UserModel
        .findOne({ _id: new mongoose.Types.ObjectId(userId) })
        .populate('authId', { username: 0, email: 0 }) as IUserDocument;
        return user;
    }*/
    aggregateProject() {
        return {
            _id: 1,
            username: '$authId.username',
            uId: '$authId.uId',
            email: '$authId.email',
            createdAt: '$authId.createdAt',
            phone: 1,
            location: 1,
            specialty: 1
        };
    }
}
exports.userService = new UserService();
//# sourceMappingURL=clinicUser.service.js.map