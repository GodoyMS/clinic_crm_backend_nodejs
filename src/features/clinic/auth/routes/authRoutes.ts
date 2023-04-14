import express, { Router } from 'express';
import { SignUp } from '@clinic/auth/controllers/signup';
import { SignIn } from '@clinic/auth/controllers/signin';
import { SignOut } from '@clinic/auth/controllers/signout';
class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', SignUp.prototype.create);
    this.router.post('/signin',SignIn.prototype.read);

    return this.router;
  }

  public signoutRoute(): Router {
   this.router.get('/signout', SignOut.prototype.update);

   return this.router;
 }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
