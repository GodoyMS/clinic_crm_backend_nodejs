import express, { Router } from 'express';
import { SignIn } from '@doctor/auth/controllers/signin';
import { SignOut } from '@doctor/auth/controllers/signout';
class AuthRoutesDoctor {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
    // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype

    this.router.post('/signin',SignIn.prototype.read);
    return this.router;
  }

  public signoutRoute(): Router {
   this.router.get('/signout', SignOut.prototype.logout);
   return this.router;
 }
}

export const authDoctorRoutes: AuthRoutesDoctor = new AuthRoutesDoctor();
