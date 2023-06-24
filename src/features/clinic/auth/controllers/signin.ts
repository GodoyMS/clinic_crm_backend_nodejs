import { Request, Response } from 'express';
import { config } from '@configs/configEnvs';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/clinicAuth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { loginSchema } from '@clinic/auth/schemes/signin';
import { IAuthDocument } from '@clinic/auth/interfaces/authDocument.interface';
import bcrypt from 'bcryptjs';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const existingUser: IAuthDocument | undefined = await authService.getAuthUserByEmail(email);

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials user not found');
    }

    const passwordMatch: boolean =await existingUser.comparePassword(password);
    console.log('Password:Math',passwordMatch);

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials password not match');
    }

    const userJwt: string = JWT.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username
      },
      config.JWT_TOKEN!
    );
    req.session = { jwt: userJwt };
    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: existingUser, token: userJwt });
  }
}
