import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { appointmentService } from '@services/db/appointment.service';

const log: Logger = logger.createLogger('appointmentWorker');

class AppointmentWorker {
  async addAppointmentToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      await appointmentService.createAppointment(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const appointmentWorker: AppointmentWorker = new AppointmentWorker();
