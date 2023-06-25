"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generators = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const configEnvs_1 = require("@configs/configEnvs");
class Generators {
    static firstLetterUppercase(str) {
        const valueString = str.toLowerCase();
        return valueString
            .split(' ')
            .map((value) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
            .join(' ');
    }
    static lowerCase(str) {
        return str.toLowerCase();
    }
    static generateRandomIntegers(integerLength) {
        const characters = '0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < integerLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return parseInt(result, 10);
    }
    static generateRandomPassword(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    static parseJson(prop) {
        try {
            JSON.parse(prop);
        }
        catch (error) {
            return prop;
        }
        return JSON.parse(prop);
    }
    static hash(password) {
        return bcryptjs_1.default.hash(password, Number(configEnvs_1.config.SALT_ROUND));
    }
}
exports.Generators = Generators;
//# sourceMappingURL=generators.js.map