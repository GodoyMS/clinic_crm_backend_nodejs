import { BaseQueue } from './base.queue';
import { IAppointmentJob } from '@root/features/appointment/interfaces/appointmentJob.interface';
import { appointmentWorker } from '@workers/appointment.worker';

class AppointmentQueue extends BaseQueue {
   constructor() {
      super('appointment');
      this.processJob('addAppointmentToDB', 5, appointmentWorker.addAppointmentToDB);
   }

   public addAppointmentJob(name: string, data: IAppointmentJob): void {
      this.addJob(name, data);
   }
}

export const appointmentQueue: AppointmentQueue = new AppointmentQueue();
