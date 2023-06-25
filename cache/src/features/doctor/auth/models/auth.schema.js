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
exports.AuthModel = void 0;
const bcryptjs_1 = require("bcryptjs");
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
//import { config } from '@configs/configEnvs';
// Design Pattern AAA / Security for Design (SBD): https://www.ticportal.es/glosario-tic/seguridad-diseno-sbd
const authSchema = new mongoose_1.Schema({
    clinicId: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'UserClinic' },
    uId: { type: 'String' },
    dni: { type: 'String' },
    email: { type: 'String' },
    password: { type: 'String' },
    createdAt: { type: Date, default: Date.now() }
}, {
    toJSON: {
        transform(_doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});
// virtual methods / spaces methods
/*authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, Number(config.SALT_ROUND));
  this.password = hashedPassword;
  next();
});*/
authSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = this.password;
        return (0, bcryptjs_1.compare)(password, hashedPassword);
    });
};
/*authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, Number(config.SALT_ROUND));
};*/
const AuthModel = (0, mongoose_1.model)('AuthDoctor', authSchema, 'AuthDoctor');
exports.AuthModel = AuthModel;
//# sourceMappingURL=auth.schema.js.map