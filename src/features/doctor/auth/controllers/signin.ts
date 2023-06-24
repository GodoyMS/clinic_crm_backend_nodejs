import { Request, Response } from 'express';
import { config } from '@configs/configEnvs';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/doctorAuth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { loginSchema } from '@doctor/auth/schemes/signin';
import { IAuthDocument } from '@doctor/auth/interfaces/authDocument.interface';
import bcrypt from 'bcryptjs';

export class SignIn {
   static compare(existingUserCompare:IAuthDocument,passwordInput:string):boolean{
      const {password} = existingUserCompare;
      const doesPasswordMatch : boolean= password === passwordInput;
      return doesPasswordMatch;
    }


  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { dni, password, } = req.body;
    const existingUser: IAuthDocument | undefined = await authService.getAuthUserByDni(dni);
    console.log(existingUser);

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials user not found');
    }



    const passwordMatch: boolean =await SignIn.compare(existingUser,password);

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials password not match');
    }

    const userJwt: string = JWT.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        dni: existingUser.dni
      },
      config.JWT_TOKEN!
    );
    req.session = { jwt: userJwt };
    res.status(HTTP_STATUS.OK).json({ message: 'Doctor login successfully', user: existingUser, token: userJwt });
  }
}
