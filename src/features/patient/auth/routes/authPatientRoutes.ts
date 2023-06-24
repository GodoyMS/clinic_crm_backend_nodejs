import express, { Router } from 'express';
import { SignUpPatient } from '@patient/auth/controllers/signup';
import { SignIn } from '@patient/auth/controllers/signin';
import { SignOut } from '@patient/auth/controllers/signout';
import { authMiddleware } from '@helpers/middlewares/auth-middleware';
class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
    // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
   //  this.router.post('/signup',authMiddleware.verifyUser, SignUpPatient.prototype.create);
    this.router.post('/signin',SignIn.prototype.read);

    return this.router;
  }

  public signoutRoute(): Router {
   this.router.get('/signout', SignOut.prototype.update);

   return this.router;
 }
}

export const authPatientRoutes: AuthRoutes = new AuthRoutes();
