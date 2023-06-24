import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { userService as userServicePatient } from '@services/db/patientUser.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IUserDocument as IUserDocumentPatient } from '@patient/user/interfaces/userDocument.interface';
import { UserCache } from '@services/redis/patientUser.cache';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@helpers/cloudinary/cloudinaryUploads';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import { deleteFile } from '@helpers/cloudinary/deleteCloudinaryFileByURL';



const userCache: UserCache = new UserCache();

export class UpdateClinicHistory {
   public async upload(req: Request, res: Response): Promise<void> {
      const patientID = req.params.id;
      const file = req.file;
      const objectFile: ObjectId = new ObjectId();
      if (!file) {
         throw new BadRequestError('No pdf provided');
      }

      const pdfResult: UploadApiResponse = (await uploads(file.path, `${objectFile}`)) as UploadApiResponse;

      if (!pdfResult?.public_id) {
         throw new BadRequestError('File upload: Error ocurred. Try again.');
      }

      const existingPatient: IUserDocumentPatient | undefined = await userServicePatient.updateClinicHistoryPatientById(
         patientID,
         `${pdfResult.secure_url}`,
      );
      if (!existingPatient) {
         throw new BadRequestError('Invalid credentials');
      } else {
         fs.unlink(file.path, unlinkError => {
            if (unlinkError) {
               // Handle file deletion error
               console.error(unlinkError);
               return res.status(500).send('Failed to delete file from the server');
            }

            // File successfully uploaded to Cloudinary and deleted from the server
         });
      }

      await existingPatient.save();

      // existingUser.set({ specialty, phone, location });
      await userCache.updateInfoAndSaveToUserCache(`${existingPatient._id}`, existingPatient);

      // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
      // const existingPatientFromCache: IUserDocumentPatient = cachedUser
      //    ? cachedUser
      //    : await userServicePatient.getUserById(patientID);

      res.status(HTTP_STATUS.OK).json({
         message: 'Patient clinic history added succesfully ',
         patient: existingPatient,
      });
   }

   public async delete(req: Request, res: Response): Promise<void> {
      const patientID = req.params.id;
      const {historyUrl}=req.body;


      try {
          await deleteFile(historyUrl);
       } catch (error) {
         throw new BadRequestError('Could not delete file from cloudinary');
         }





      const existingPatient: IUserDocumentPatient | undefined = await userServicePatient.deleteClinicHistoryPatientById(
         patientID,
         `${historyUrl}`,
      );
      if (!existingPatient) {
         throw new BadRequestError('Invalid credentials');
      }

      await existingPatient.save();

      // existingUser.set({ specialty, phone, location });
      await userCache.updateInfoAndSaveToUserCache(`${existingPatient._id}`, existingPatient);

      // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
      // const existingPatientFromCache: IUserDocumentPatient = cachedUser
      //    ? cachedUser
      //    : await userServicePatient.getUserById(patientID);

      res.status(HTTP_STATUS.OK).json({
         message: 'Patient clinic history added succesfully ',
         patient: existingPatient,
      });
   }
}
