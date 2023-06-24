import { Response } from 'express';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import { AuthPayload } from '@clinic/auth/interfaces/authPayload.interface';
import { Iimage } from '@helpers/cloudinary/imageResult.interface';

// GIVEN STEP

// MOCK 1: REQUEST
export const authMockRequest = (
   sessionData: IJWT,
   body: IAuthMock,
   currentUser?: AuthPayload | null,
   params?: unknown,
) => ({
   session: sessionData,
   body,
   currentUser,
   params,
});

// MOCK 2: RESPONSE
export const authMockResponse = (): Response => {
   const res: Response = {} as Response;
   res.status = jest.fn().mockReturnValue(res); // simular el código de status
   res.json = jest.fn().mockReturnValue(res); // simularemos los datos con los retorne el json
   return res;
};

// INTERFACES
export interface IJWT {
   // estructura con el token de la sesión
   jwt?: string;
}

export interface IAuthMock {
   // estructura de datos con datos que puedo enviar para diversos procesos de autenticación
   _id?: string;
   username?: string;
   email?: string;
   uId?: string;
   password?: string;
   avatarColor?: string;
   avatarImage?: string;
   createdAt?: Date | string;
   confirmPassword?: string;
}

// MOCK VALUES
export const authUserPayload: AuthPayload = {
   // estructura de mock como datos a validar a partir de la sesión
   userId: '64445f6f71deea921872414b',
   uId: '677425988324',
   username: 'test30',
   email: 'test30@gmail.com',
   iat: 12345,
};

export const authMock = {
   // estructura de mock como documento
   id: '64445f6f71deea921872414b',
   uId: '677425988324',
   username: 'test30',
   password: 'test30',
   email: 'yorman@gmail.com',
   createdAt: new Date(),
   save: () => {},
} as unknown as IAuthDocument;

export const signUpMockData = {
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

export const imageMock = {
   version: '1234737373',
   public_id: '123456',
} as Iimage;

export const PASSWORD = 'test30';
export const USERNAME = 'test30';
export const WRONG_USERNAME = 'tes';
export const LONG_USERNAME = 'test30thisismytest';
export const WRONG_PASSWORD = 'test1233';
export const LONG_PASSWORD = 'test30verylongpassword';
export const JWT = 'mytoken';
export const INVALID_EMAIL = 'test30.com';

// PASSWORD TESTS
export const WRONG_EMAIL = 'test24112@gmail.com';
export const CORRECT_EMAIL = 'test30@gmail.com';
