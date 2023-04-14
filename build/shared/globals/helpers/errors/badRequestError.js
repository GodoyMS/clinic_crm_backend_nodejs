"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const customError_1 = require("./customError");
class BadRequestError extends customError_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        this.status = 'error';
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=badRequestError.js.map