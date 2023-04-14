"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// Design Pattern Facade: https://refactoring.guru/es/design-patterns/facade
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
    serializeErrors() {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode
        };
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customError.js.map