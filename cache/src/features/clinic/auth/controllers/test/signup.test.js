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
const auth_mock_1 = require("@root/shared/globals/mocks/auth.mock");
const auth_mock_2 = require("@root/shared/globals/mocks/auth.mock");
const signup_1 = require("../signup");
const clinicAuth_service_1 = require("@services/db/clinicAuth.service");
jest.useFakeTimers();
jest.mock('@services/queues/base.queue');
jest.mock('@helpers/cloudinary/cloudinaryUploads');
jest.mock('@services/redis/clinicUser.cache');
jest.mock('@services/queues/clinicUser.queue');
jest.mock('@services/queues/clinicAuth.queue');
describe('Signup', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
    // Design Pattern:GIVEN WHEN THEN https://martinfowler.com/bliki/GivenWhenThen.html
    // UNITARY TEST 1
    it('should throw an error if username is not available', () => __awaiter(void 0, void 0, void 0, function* () {
        // GIVEN STEP
        const req = (0, auth_mock_1.authMockRequest)({}, {
            username: '',
            email: 'test30@gmail.com',
            password: 'test30',
        });
        const res = (0, auth_mock_2.authMockResponse)();
        // WHEN STEP
        yield signup_1.SignUp.prototype.create(req, res).catch((error) => {
            // THEN STEP: ASSERT
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Username is a required field');
        });
    }));
    // INTEGRATION TEST 1
    it('should throw unauthorize error if user already exist', () => __awaiter(void 0, void 0, void 0, function* () {
        // GIVEN STEP
        const req = (0, auth_mock_1.authMockRequest)({}, {
            username: 'test30',
            email: 'test30@gmail.com',
            password: 'test30',
        });
        const res = (0, auth_mock_2.authMockResponse)();
        // WHEN STEP
        jest.spyOn(clinicAuth_service_1.authService, 'getUserByUsernameOrEmail').mockResolvedValue(auth_mock_1.authMock);
        yield signup_1.SignUp.prototype.create(req, res).catch((error) => {
            // THEN STEP: ASSERT
            expect(error.statusCode).toEqual(400);
            expect(error.serializeErrors().message).toEqual('Invalid credentials for this user');
        });
    }));
});
//# sourceMappingURL=signup.test.js.map