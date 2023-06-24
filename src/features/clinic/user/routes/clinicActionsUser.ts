import express, { Router } from 'express';
import { AuthMiddleware, authMiddleware } from '@helpers/middlewares/auth-middleware';
import { UpdateAuth } from '@clinic/auth/controllers/updateAuth';
import { UpdateClinicInfo } from '@clinic/user/controllers/updateProfile';
class ClinicUserActionsRoutes {

   private router:Router;
   constructor(){
      this.router=express.Router();

   }

   public updateClinicInfoRoute():Router{
          // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
    // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
      this.router.put('/updateClinicInfo',authMiddleware.checkAuthentication,UpdateClinicInfo.prototype.update);


      return this.router;
   }


}

export const clinicUserActionsRoutes:ClinicUserActionsRoutes=new ClinicUserActionsRoutes();

