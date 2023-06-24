"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    authId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'AuthPatient' },
    clinic: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserClinic' },
    dni: { type: String, default: '' },
    password: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    names: { type: String, default: '' },
    age: { type: String, default: '' },
    city: { type: String, default: '' },
    sex: { type: String, default: '' },
    clinicHistory: [{ type: String }],
    odontogram: [{ type: String }],
    consent: [{ type: String }],
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
});
const UserModel = (0, mongoose_1.model)('UserPatient', userSchema, 'UserPatient');
exports.UserModel = UserModel;
//# sourceMappingURL=user.schema.js.map