import express, { Router } from 'express';
import { SignUp } from '@clinic/auth/controllers/signup';
import { SignIn } from '@clinic/auth/controllers/signin';
import { SignOut } from '@clinic/auth/controllers/signout';
import { DeleteUserClinic } from '../controllers/deleteClinic';
import {  authMiddleware } from '@helpers/middlewares/auth-middleware';

class AuthRoutes {
   private router: Router;

   constructor() {
      this.router = express.Router();
   }

   public signInSingUpRoutes(): Router {
      // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
      // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
      this.router.post('/signup', SignUp.prototype.create);
      this.router.post('/signin', SignIn.prototype.read);
      return this.router;
   }

   public signoutRoute(): Router {
      this.router.get('/signout', SignOut.prototype.update);

      return this.router;
   }
   public deleteClinicRoute(): Router {
      this.router.delete('/deleteClinic', authMiddleware.checkAuthentication, DeleteUserClinic.prototype.delete);

      return this.router;
   }
}

export const authRoutesClinic: AuthRoutes = new AuthRoutes();
