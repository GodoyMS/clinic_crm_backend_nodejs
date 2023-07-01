
declare global {
   namespace Express {
      interface Request {
         currentUser?: AuthPayload;
         jwt?:string
      }


   }
}

//SOLID INTERFACE SEGRETATION

export interface AuthPayload {
   userId: string;
   uId: string;
   email: string;
   username: string;
   iat?: number;
}

