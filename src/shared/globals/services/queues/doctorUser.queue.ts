import { BaseQueue } from './base.queue';
import { doctorUserWorker } from '@workers/doctorUser.worker';
import { IUserJob } from '@doctor/user/interfaces/userJob.interface';
class UserQueue extends BaseQueue {
   constructor() {
      super('userDoctor');
      this.processJob('addUserDoctorToDB', 5, doctorUserWorker.addUserToDB);
   }

   public addUserJob(name: string, data: IUserJob): void {
      this.addJob(name, data);
   }
}

export const userQueue: UserQueue = new UserQueue();
