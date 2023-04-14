import { Job, DoneCallback } from 'bull';
import { mailTransport } from '@services/email/mail.transport';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';

const log: Logger = logger.createLogger('Email worker');
export class EmailWorker {
   async addNotificationEmail(job: Job, done: DoneCallback): Promise<void> {
      try {
         const { template, receiverEmail, subject } = job.data;
         await mailTransport.sendMail(template, receiverEmail, subject);
         job.progress(100);
         done(null, job.data);
      } catch (error) {
         log.error(error);
         done(error as Error);
      }
   }
}
export const emailWorker: EmailWorker = new EmailWorker();
