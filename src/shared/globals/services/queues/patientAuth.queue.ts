import { BaseQueue } from './base.queue';
import { IAuthJob } from '@patient/auth/interfaces/authJob.interface';
import { patientAuthWorker } from '@workers/patientAuth.worker';
class AuthQueue extends BaseQueue {
   constructor() {
      super('authPatient');
      this.processJob('addAuthUserPatientToDB', 5, patientAuthWorker.addAuthUserToDB);
   }

   public addAuthUserJob(name: string, data: IAuthJob): void {
      this.addJob(name, data);
   }
}

export const authQueue: AuthQueue = new AuthQueue();
