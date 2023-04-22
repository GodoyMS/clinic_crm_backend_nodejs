
declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}






export interface AuthPayload {
  userId: string;
  uId: string;
  email: string;

  iat?: number;
}
