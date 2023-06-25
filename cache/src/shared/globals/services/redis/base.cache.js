"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCache = void 0;
const redis_1 = require("redis");
const configEnvs_1 = require("@configs/configEnvs");
const configLogs_1 = require("@configs/configLogs");
class BaseCache {
    constructor(cacheName) {
        this.client = (0, redis_1.createClient)({ url: configEnvs_1.config.REDIS_HOST });
        this.log = configLogs_1.logger.createLogger(cacheName);
        this.cacheError();
    }
    cacheError() {
        this.client.on('error', (error) => {
            this.log.error(error);
        });
    }
}
exports.BaseCache = BaseCache;
//# sourceMappingURL=base.cache.js.map