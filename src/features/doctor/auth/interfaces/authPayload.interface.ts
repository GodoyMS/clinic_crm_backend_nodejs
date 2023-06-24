
declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}





//SOLID INTERFACE SEGRETATION

export interface AuthPayload {
  userId: string;
  uId: string;
  email: string;
  username:string,

  iat?: number;
}
