import { ISocialLinks } from './socialLinks.interface';
//SOLID INTERFACE SEGRETATION

export interface IUserJobInfo {
  key?: string;
  value?: string | ISocialLinks;
}
