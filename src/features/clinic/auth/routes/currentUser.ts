import express, { Router } from 'express';
import { AuthMiddleware, authMiddleware } from '@helpers/middlewares/auth-middleware';
import { CurrentUser } from '@clinic/auth/controllers/currentUser';
import { UpdateAuth } from '@clinic/auth/controllers/updateAuth';
class CurrentUserRoutesClinic {

   private router:Router;
   constructor(){
      this.router=express.Router();

   }

   public routes():Router{
      this.router.get('/currentUser',authMiddleware.checkAuthentication,CurrentUser.prototype.read);
      return this.router;
   }


}

export const currentUserRoutesClinic:CurrentUserRoutesClinic=new CurrentUserRoutesClinic();

