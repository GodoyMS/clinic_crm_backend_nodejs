import Logger from 'bunyan';
import nodemailer from 'nodemailer';
import { logger } from '@configs/configLogs';
import Mail from 'nodemailer/lib/mailer';
import sendGridMail from '@sendgrid/mail';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { config } from '@configs/configEnvs';

interface IMailOptions {
   from: string;
   to: string;
   subject: string;
   html: string;
}
const log: Logger = logger.createLogger('mailOptions');
sendGridMail.setApiKey(config.SENGRID_API_KEY!);

class MailTransport {
   public async sendMail(recevierEmail: string, subject: string, body: string): Promise<void> {
      if (config.NODE_ENV === 'test' || config.NODE_ENV === 'development') {
         this.developmentEmailSender(recevierEmail, subject, body);
      } else {
         this.productionEmailSender(recevierEmail, subject, body);
      }
   }

   private async developmentEmailSender(receiverEmial: string, subject: string, body: string) {
      //

      const transporter: Mail = nodemailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
            user: config.SENDER_EMAIL, // generated ethereal user
            pass: config.SENDER_EMAIL_PASSWORD, // generated ethereal password
         },
      });
      const mailOptions: IMailOptions = {
         from: `Chat App <${config.SENDER_EMAIL}>`,
         to: receiverEmial,
         subject,
         html: body,
      };

      try {
         await transporter.sendMail(mailOptions);
         log.info('Development email sent succesfully');
      } catch (error) {
         log.error('Error sending email:', error);
         throw new BadRequestError('Error sending email');
      }
   }

   private async productionEmailSender(receiverEmial: string, subject: string, body: string) {
      const mailOptions: IMailOptions = {
         from: `Chat App <${config.SENDER_EMAIL}>`,
         to: receiverEmial,
         subject,
         html: body,
      };

      try {
         await sendGridMail.send(mailOptions);
         log.info('Development email sent succesfully');
      } catch (error) {
         log.error('Error sending email:', error);
         throw new BadRequestError('Error sending email');
      }
   }
}

export const mailTransport: MailTransport = new MailTransport();
