"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object().keys({
    dni: joi_1.default.string().required().messages({
        'string.base': 'Field must be a string',
    }),
    password: joi_1.default.string().required().min(4).max(40).messages({
        'string.base': 'Password must be of type string',
        'string.min': 'Password should have more than 4 characters',
        'string.max': 'Invalid password',
        'string.empty': 'Password is a required field'
    })
});
exports.loginSchema = loginSchema;
//# sourceMappingURL=signin.js.map