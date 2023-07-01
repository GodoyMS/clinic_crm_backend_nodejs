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
const configLogs_1 = require("@configs/configLogs");
const serverError_1 = require("@helpers/errors/serverError");
const generators_1 = require("@helpers/generators/generators");
const log = configLogs_1.logger.createLogger('userPatientCache');
class UserCache extends base_cache_1.BaseCache {
    constructor() {
        super('patientUserCache');
    }
    saveToUserCache(key, userUId, createdUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const { _id, uId, dni, clinicId, email, phone, names, age, city, sex, clinicHistory, odontogram, consent } = createdUser;
            const dataToSave = {
                _id: `${_id}`,
                uId: `${uId}`,
                dni: `${dni}`,
                clinicId: `${clinicId}`,
                email: `${email}`,
                phone: `${phone}`,
                names: `${names}`,
                age: `${age}`,
                city: `${city}`,
                sex: `${sex}`,
                clinicHistory: JSON.stringify(clinicHistory),
                odontogram: JSON.stringify(odontogram),
                consent: JSON.stringify(consent),
                createdAt: `${createdAt}`,
            };
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                yield this.client.ZADD('userPatient', { score: parseInt(userUId, 10), value: `${key}` });
                for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
                    yield this.client.HSET(`usersPatient:${key}`, `${itemKey}`, `${itemValue}`);
                }
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
                yield this.client.DEL(`usersPatient:${key}`);
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
    updateInfoAndSaveToUserCache(key, exisitingUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, uId, dni, clinicId, email, phone, names, age, city, sex, clinicHistory, odontogram, consent } = exisitingUser;
            const dataToSave = {
                _id: `${_id}`,
                uId: `${uId}`,
                dni: `${dni}`,
                clinicId: `${clinicId}`,
                email: `${email}`,
                phone: `${phone}`,
                names: `${names}`,
                age: `${age}`,
                city: `${city}`,
                sex: `${sex}`,
                clinicHistory: JSON.stringify(clinicHistory),
                odontogram: JSON.stringify(odontogram),
                consent: JSON.stringify(consent),
            };
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
                    yield this.client.HSET(`usersPatient:${key}`, `${itemKey}`, `${itemValue}`);
                }
            }
            catch (error) {
                log.error(error);
                throw new serverError_1.ServerError('Server Redis error. Try again.');
            }
        });
    }
    ;
    getUserFromCache(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                const response = (yield this.client.HGETALL(`usersPatient:${userId}`));
                response.createdAt = new Date(generators_1.Generators.parseJson(`${response.createdAt}`));
                response.clinicId = generators_1.Generators.parseJson(`${response.clinicId}`);
                response.phone = generators_1.Generators.parseJson(`${response.phone}`);
                response.names = generators_1.Generators.parseJson(`${response.names}`);
                response.age = generators_1.Generators.parseJson(`${response.age}`);
                response.city = generators_1.Generators.parseJson(`${response.city}`);
                response.sex = generators_1.Generators.parseJson(`${response.sex}`);
                response.clinicHistory = generators_1.Generators.parseJson(`${response.clinicHistory}`);
                response.odontogram = generators_1.Generators.parseJson(`${response.odontogram}`);
                response.consent = generators_1.Generators.parseJson(`${response.consent}`);
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
//# sourceMappingURL=patientUser.cache.js.map