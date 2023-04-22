import express, { Router } from 'express';
import { SignUpPatient } from '@patient/auth/controllers/signup';
import { SignIn } from '@patient/auth/controllers/signin';
import { SignOut } from '@patient/auth/controllers/signout';
class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', SignUpPatient.prototype.create);
    this.router.post('/signin',SignIn.prototype.read);

    return this.router;
  }

  public signoutRoute(): Router {
   this.router.get('/signout', SignOut.prototype.update);

   return this.router;
 }
}

export const authPatientRoutes: AuthRoutes = new AuthRoutes();
