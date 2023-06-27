import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { clinicActionsService } from '@services/db/clinicActions/clinicActions';

export class GetClinicPatients {
   public async read(req: Request, res: Response): Promise<void> {
      const clinicPatients = await clinicActionsService.getAllPatientsWithClinicId(req.currentUser!.userId);

      res.status(HTTP_STATUS.OK).json({ patients: clinicPatients });
   }
}
