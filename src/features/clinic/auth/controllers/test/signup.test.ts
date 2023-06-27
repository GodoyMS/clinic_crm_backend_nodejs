import { Request, Response } from 'express';
import { authMock, authMockRequest } from '@root/shared/globals/mocks/auth.mock';
import { authMockResponse } from '@root/shared/globals/mocks/auth.mock';
import { SignUp } from '../signup';
import { CustomError } from '@helpers/errors/customError';
import { authService } from '@services/db/clinicAuth.service';

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
   it('should throw an error if username is not available', async () => {
      // GIVEN STEP
      const req: Request = authMockRequest(
         {},
         {
            username: '',
            email: 'test30@gmail.com',
            password: 'test30',
         },
      ) as Request;
      const res: Response = authMockResponse();

      // WHEN STEP
      await SignUp.prototype.create(req, res).catch((error: CustomError) => {
         // THEN STEP: ASSERT
         expect(error.statusCode).toEqual(400);
         expect(error.serializeErrors().message).toEqual('Username is a required field');
      });
   });

   // INTEGRATION TEST 1
   it('should throw unauthorize error if user already exist', async () => {
      // GIVEN STEP
      const req: Request = authMockRequest(
         {},
         {
            username: 'test30',
            email: 'test30@gmail.com',
            password: 'test30',
         },
      ) as Request;
      const res: Response = authMockResponse();

      // WHEN STEP
      jest.spyOn(authService, 'getUserByUsernameOrEmail').mockResolvedValue(authMock);
      await SignUp.prototype.create(req, res).catch((error: CustomError) => {
         // THEN STEP: ASSERT
         expect(error.statusCode).toEqual(400);
         expect(error.serializeErrors().message).toEqual('Invalid credentials for this user');
      });
   });
});
