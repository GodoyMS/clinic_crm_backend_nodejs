"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const bunyan_1 = __importDefault(require("bunyan"));
class LoggerConfig {
    createLogger(name) {
        return bunyan_1.default.createLogger({ name, level: 'debug' });
    }
}
exports.logger = new LoggerConfig();
//# sourceMappingURL=configLogs.js.map