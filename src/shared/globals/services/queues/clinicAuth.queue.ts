import { BaseQueue } from './base.queue';
import { IAuthJob } from '@clinic/auth/interfaces/authJob.interface';
import { clinicAuthWorker } from '@workers/clinicAuth.worker';

class AuthQueue extends BaseQueue {
   constructor() {
      super('authClinic');
      this.processJob('addAuthUserClinicToDB', 5, clinicAuthWorker.addAuthUserToDB);
   }

   public addAuthUserJob(name: string, data: IAuthJob): void {
      this.addJob(name, data);
   }
}

export const authQueue: AuthQueue = new AuthQueue();
