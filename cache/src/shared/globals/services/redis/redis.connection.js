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
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const configLogs_1 = require("../../../../configs/configLogs");
const base_cache_1 = require("./base.cache");
const log = configLogs_1.logger.createLogger('redisConnection');
// Design Pattern Singleton: https://refactoring.guru/es/design-patterns/singleton
class RedisConnection extends base_cache_1.BaseCache {
    constructor() {
        super('redisConnection');
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                log.info(`Redis connection: ${yield this.client.ping()}`);
            }
            catch (error) {
                log.error(error);
            }
        });
    }
}
exports.redisConnection = new RedisConnection();
//# sourceMappingURL=redis.connection.js.map