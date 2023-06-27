import bcrypt from 'bcryptjs';
import { config } from '@configs/configEnvs';

export class Generators {
   static firstLetterUppercase(str: string): string {
      const valueString = str.toLowerCase();
      return valueString
         .split(' ')
         .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
         .join(' ');
   }

   static lowerCase(str: string): string {
      return str.toLowerCase();
   }

   static generateRandomIntegers(integerLength: number): number {
      const characters = '0123456789';
      let result = ' ';
      const charactersLength = characters.length;
      for (let i = 0; i < integerLength; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return parseInt(result, 10);
   }

   static generateRandomPassword(length: number): string {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~';
      let password = '';
      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * charset.length);
         password += charset[randomIndex];
      }
      return password;
   }

   static parseJson(prop: string) {
      try {
         JSON.parse(prop);
      } catch (error) {
         return prop;
      }
      return JSON.parse(prop);
   }

   static hash(password: string): Promise<string> {
      return bcrypt.hash(password, Number(config.SALT_ROUND));
   }
}
