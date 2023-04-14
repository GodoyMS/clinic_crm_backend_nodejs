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
exports.UserCache = void 0;
const base_cache_1 = require("./base.cache");
const configLogs_1 = require("../../../../configs/configLogs");
const serverError_1 = require("../../helpers/errors/serverError");
const generators_1 = require("../../helpers/generators/generators");
const log = configLogs_1.logger.createLogger('userCache');
class UserCache extends base_cache_1.BaseCache {
    constructor() {
        super('clinicUserCache');
    }
    saveToUserCache(key, userUId, createdUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const { _id, uId, username, email, patients, doctors, location, specialty } = createdUser;
            const dataToSave = {
                _id: `${_id}`,
                uId: `${uId}`,
                username: `${username}`,
                email: `${email}`,
                patients: JSON.stringify(patients),
                doctors: JSON.stringify(doctors),
                location: JSON.stringify(location),
                specialty: `${specialty}`,
                createdAt: `${createdAt}`,
            };
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                yield this.client.ZADD('user', { score: parseInt(userUId, 10), value: `${key}` });
                for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
                    yield this.client.HSET(`users:${key}`, `${itemKey}`, `${itemValue}`);
                }
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
    getUserFromCache(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                const response = (yield this.client.HGETALL(`users:${userId}`));
                response.patients = generators_1.Generators.parseJson(`${response.patients}`);
                response.doctors = generators_1.Generators.parseJson(`${response.doctors}`);
                response.appointments = generators_1.Generators.parseJson(`${response.appointments}`);
                response.phone = generators_1.Generators.parseJson(`${response.phone}`);
                response.specialty = generators_1.Generators.parseJson(`${response.specialty}`);
                response.createdAt = new Date(generators_1.Generators.parseJson(`${response.createdAt}`));
                response.location = generators_1.Generators.parseJson(`${response.location}`);
                return response;
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
}
exports.UserCache = UserCache;
//# sourceMappingURL=clinicUser.cache.js.map