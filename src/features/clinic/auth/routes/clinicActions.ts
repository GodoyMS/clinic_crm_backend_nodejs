import express, { Router } from 'express';
import { AuthMiddleware, authMiddleware } from '@helpers/middlewares/auth-middleware';
import { UpdateAuth } from '@clinic/auth/controllers/updateAuth';
class ClinicActionsRoutes {

   private router:Router;
   constructor(){
      this.router=express.Router();

   }

   public routes():Router{
      this.router.put('/updateAuth',authMiddleware.checkAuthentication,UpdateAuth.prototype.update);
      this.router.put('/updatePassword',authMiddleware.checkAuthentication,UpdateAuth.prototype.updatePassword);
      this.router.get('/getAuthData',authMiddleware.checkAuthentication,UpdateAuth.prototype.getAuthData);

      return this.router;
   }


}

export const clinicActionsRoutes:ClinicActionsRoutes=new ClinicActionsRoutes();

