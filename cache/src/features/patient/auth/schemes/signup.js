"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object().keys({
    dni: joi_1.default.string().required().min(4).max(8).messages({
        'string.base': 'Dni must be of type string',
        'string.min': 'Invalid dni',
        'string.max': 'Invalid dni',
        'string.empty': 'Dni is a required field'
    }),
    names: joi_1.default.string().required().messages({
        'string.base': 'Names must be of type string',
        'string.empty': 'Names is a required field'
    }),
    sex: joi_1.default.string().required().messages({
        'string.base': 'Sex must be of type string',
        'string.empty': 'Sex is a required field'
    })
});
exports.signupSchema = signupSchema;
//# sourceMappingURL=signup.js.map