import { IEmailJob } from '@clinic/user/interfaces/emailJob.interface';
import { BaseQueue } from './base.queue';
import { emailWorker } from '@workers/email.worker';
class EmailQueue extends BaseQueue {
   constructor() {
      super('emails');
      this.processJob('forgotPasswordEmai', 5, emailWorker.addNotificationEmail);
   }

   public addEmailJob(name: string, data: IEmailJob): void {
      //
      this.addJob(name, data);
   }
}

export const emailQueue: EmailQueue = new EmailQueue();
