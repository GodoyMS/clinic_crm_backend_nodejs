//SOLID INTERFACE SEGRETATION

export interface IEmailJob {
  receiverEmail: string;
  template: string;
  subject: string;
}
