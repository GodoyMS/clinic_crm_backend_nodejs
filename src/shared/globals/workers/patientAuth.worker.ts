import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { authService } from '@services/db/patientAuth.service';

const log: Logger = logger.createLogger('authPatientWorker');

class PatientAuthWorker {
   async addAuthUserToDB(job: Job, done: DoneCallback): Promise<void> {
      try {
         const { value } = job.data;
         await authService.createAuthUser(value);
         job.progress(100);
         done(null, job.data);
      } catch (error) {
         log.error(error);
         done(error as Error);
      }
   }
}

export const patientAuthWorker: PatientAuthWorker = new PatientAuthWorker();
