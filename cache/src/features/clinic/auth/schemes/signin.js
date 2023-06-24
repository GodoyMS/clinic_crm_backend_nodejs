"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Field must be a string',
        'string.required': 'Email is a required field',
        'string.email': 'Email must be valid'
    }),
    password: joi_1.default.string().required().min(4).max(40).messages({
        'string.base': 'Password must be of type string',
        'string.min': 'Invalid password',
        'string.max': 'Invalid password',
        'string.empty': 'Password is a required field'
    })
});
exports.loginSchema = loginSchema;
//# sourceMappingURL=signin.js.map