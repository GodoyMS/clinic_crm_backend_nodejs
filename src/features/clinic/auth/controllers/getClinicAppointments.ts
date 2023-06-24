import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { clinicActionsService } from '@services/db/clinicActions/clinicActions';


export class GetClinicAppointments {
   public async read(req: Request, res: Response): Promise<void> {

      const clinicAppointments= await clinicActionsService.getAllAppointmentsWithClinicId(req.currentUser!.userId);

      res.status(HTTP_STATUS.OK).json({appointments:clinicAppointments});

   }
}
