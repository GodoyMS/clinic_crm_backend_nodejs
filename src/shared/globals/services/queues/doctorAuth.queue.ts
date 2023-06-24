import { BaseQueue } from './base.queue';
import { IAuthJob } from '@doctor/auth/interfaces/authJob.interface';
import { doctorAuthWorker } from '@workers/doctorAuth.worker';
class AuthQueue extends BaseQueue {

  constructor() {
    super('authDoctor');
    this.processJob('addAuthUserDoctorToDB', 5, doctorAuthWorker.addAuthUserToDB);
  }

  public addAuthUserJob(name: string, data: IAuthJob): void {
    this.addJob(name, data);
  }
}

export const authQueue: AuthQueue = new AuthQueue();
