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
    updateAFieldUserInCache(key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                yield this.client.HSET(`usersClinic:${key}`, `${field}`, `${value}`);
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
    deleteAUserCache(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                yield this.client.DEL(`usersClinic:${key}`);
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
    updateAllFieldsInCache(key, userUId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, username, phone, email, location, specialty } = updatedUser;
            const dataToSave = {
                _id: `${_id}`,
                uId: `${userUId}`,
                username: `${username}`,
                phone: `${phone}`,
                email: `${email}`,
                location: JSON.stringify(location),
                specialty: `${specialty}`,
            };
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
                    yield this.client.HSET(`usersClinic:${key}`, `${itemKey}`, `${itemValue}`);
                }
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
    saveToUserCache(key, userUId, createdUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const { _id, uId, username, phone, email, location, specialty } = createdUser;
            const dataToSave = {
                _id: `${_id}`,
                uId: `${uId}`,
                username: `${username}`,
                phone: `${phone}`,
                email: `${email}`,
                location: JSON.stringify(location),
                specialty: `${specialty}`,
                createdAt: `${createdAt}`,
            };
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                yield this.client.ZADD('userClinic', { score: parseInt(userUId, 10), value: `${key}` });
                for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
                    yield this.client.HSET(`usersClinic:${key}`, `${itemKey}`, `${itemValue}`);
                }
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error saveToUserCache. Try again.');
            }
        });
    }
    getUserFromCache(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                const response = (yield this.client.HGETALL(`usersClinic:${userId}`));
                response.phone = generators_1.Generators.parseJson(`${response.phone}`);
                response.specialty = generators_1.Generators.parseJson(`${response.specialty}`);
                response.createdAt = new Date(generators_1.Generators.parseJson(`${response.createdAt}`));
                response.location = generators_1.Generators.parseJson(`${response.location}`);
                response.email = generators_1.Generators.parseJson(`${response.email}`);
                return response;
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error getUserFromCache. Try again.');
            }
        });
    }
}
exports.UserCache = UserCache;
//# sourceMappingURL=clinicUser.cache.js.map