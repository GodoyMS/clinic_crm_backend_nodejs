import { Request, Response } from 'express';
import multer from 'multer';
const storage = multer.diskStorage({
   destination: (req: Request, file, cb) => {
      cb(null, 'uploads');
   },
   filename: (req: Request, file, cb) => {
      cb(null, file.originalname);
   },
});

const uploadMulter = multer({ storage });
export const upload = uploadMulter.single('pdf');

export const uploadFile = (req: Request, res: Response) => {
   res.send({ data: 'Enviar archivo' });
};
