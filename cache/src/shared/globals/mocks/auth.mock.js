"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORRECT_EMAIL = exports.WRONG_EMAIL = exports.INVALID_EMAIL = exports.JWT = exports.LONG_PASSWORD = exports.WRONG_PASSWORD = exports.LONG_USERNAME = exports.WRONG_USERNAME = exports.USERNAME = exports.PASSWORD = exports.imageMock = exports.signUpMockData = exports.authMock = exports.authUserPayload = exports.authMockResponse = exports.authMockRequest = void 0;
// GIVEN STEP
// MOCK 1: REQUEST
const authMockRequest = (sessionData, body, currentUser, params) => ({
    session: sessionData,
    body,
    currentUser,
    params,
});
exports.authMockRequest = authMockRequest;
// MOCK 2: RESPONSE
const authMockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // simular el código de status
    res.json = jest.fn().mockReturnValue(res); // simularemos los datos con los retorne el json
    return res;
};
exports.authMockResponse = authMockResponse;
// MOCK VALUES
exports.authUserPayload = {
    // estructura de mock como datos a validar a partir de la sesión
    userId: '64445f6f71deea921872414b',
    uId: '677425988324',
    username: 'test30',
    email: 'test30@gmail.com',
    iat: 12345,
};
exports.authMock = {
    // estructura de mock como documento
    id: '64445f6f71deea921872414b',
    uId: '677425988324',
    username: 'test30',
    password: 'test30',
    email: 'yorman@gmail.com',
    createdAt: new Date(),
    save: () => { },
};
exports.signUpMockData = {
    // estructura de dato que se genera del usuario una vez de autentica, por ej: en signup process
    _id: '605727cd646eb50e668a4e13',
    uId: '92241616324557172',
    username: 'test30',
    specialty: 'Odontologia',
    email: 'test30@gmail.com',
    password: 'test30',
    phone: '13123231312',
    location: {
        district: 'Pasco',
        province: 'Pasco',
        region: 'Cerro de Pasco',
        address: 'Av. Narnia 767',
    },
};
exports.imageMock = {
    version: '1234737373',
    public_id: '123456',
};
exports.PASSWORD = 'test30';
exports.USERNAME = 'test30';
exports.WRONG_USERNAME = 'tes';
exports.LONG_USERNAME = 'test30thisismytest';
exports.WRONG_PASSWORD = 'test1233';
exports.LONG_PASSWORD = 'test30verylongpassword';
exports.JWT = 'mytoken';
exports.INVALID_EMAIL = 'test30.com';
// PASSWORD TESTS
exports.WRONG_EMAIL = 'test24112@gmail.com';
exports.CORRECT_EMAIL = 'test30@gmail.com';
//# sourceMappingURL=auth.mock.js.map