"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailTransport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const configLogs_1 = require("../../../../configs/configLogs");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const badRequestError_1 = require("../../helpers/errors/badRequestError");
const configEnvs_1 = require("../../../../configs/configEnvs");
const log = configLogs_1.logger.createLogger('mailOptions');
mail_1.default.setApiKey(configEnvs_1.config.SENGRID_API_KEY);
class MailTransport {
    sendMail(recevierEmail, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (configEnvs_1.config.NODE_ENV === 'test' || configEnvs_1.config.NODE_ENV === 'development') {
                this.developmentEmailSender(recevierEmail, subject, body);
            }
            else {
                this.productionEmailSender(recevierEmail, subject, body);
            }
        });
    }
    developmentEmailSender(receiverEmial, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: configEnvs_1.config.SENDER_EMAIL,
                    pass: configEnvs_1.config.SENDER_EMAIL_PASSWORD, // generated ethereal password
                },
            });
            const mailOptions = {
                from: `Chat App <${configEnvs_1.config.SENDER_EMAIL}>`,
                to: receiverEmial,
                subject,
                html: body,
            };
            try {
                yield transporter.sendMail(mailOptions);
                log.info('Development email sent succesfully');
            }
            catch (error) {
                log.error('Error sending email:', error);
                throw new badRequestError_1.BadRequestError('Error sending email');
            }
        });
    }
    productionEmailSender(receiverEmial, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `Chat App <${configEnvs_1.config.SENDER_EMAIL}>`,
                to: receiverEmial,
                subject,
                html: body,
            };
            try {
                yield mail_1.default.send(mailOptions);
                log.info('Development email sent succesfully');
            }
            catch (error) {
                log.error('Error sending email:', error);
                throw new badRequestError_1.BadRequestError('Error sending email');
            }
        });
    }
}
exports.mailTransport = new MailTransport();
//# sourceMappingURL=mail.transport.js.map