import express, { Router } from 'express';
import {  authMiddleware } from '@helpers/middlewares/auth-middleware';
import { CurrentUser } from '@patient/auth/controllers/currentUser';

class CurrentUserRoutesPatient {
   private router: Router;
   constructor() {
      this.router = express.Router();
   }

   public routes(): Router {
      this.router.get('/currentUser', authMiddleware.checkAuthentication, CurrentUser.prototype.read);

      return this.router;
   }
}

export const currentUserRoutesPatient: CurrentUserRoutesPatient = new CurrentUserRoutesPatient();
