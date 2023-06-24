import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { userService as userServicePatient } from '@services/db/patientUser.service';
import { userService } from '@services/db/doctorUser.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { AuthPayload } from '../interfaces/authPayload.interface';
import { UserCache } from '@services/redis/doctorUser.cache';
import { IUserDocument as IUserDocumentDoctor } from '@doctor/user/interfaces/userDocument.interface';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import {  UploadApiResponse } from 'cloudinary';
import { uploads } from '@helpers/cloudinary/cloudinaryUploads';
import { deleteFile } from '@helpers/cloudinary/deleteCloudinaryFileByURL';
const userCache: UserCache = new UserCache();

export class UpdateDoctor {
   public async updateProfileById(req: Request, res: Response): Promise<void> {
      const doctorID = req.params.id;
      const {profileImage} = req.body;
      const objectFile: ObjectId = new ObjectId();

      if (!profileImage) {
         throw new BadRequestError('No image provided');
      }

      //Delete image from cloudinary
      const existingDoctorForImageDeletion: IUserDocumentDoctor | undefined = await userService.getUserDocById(doctorID);
      if (!existingDoctorForImageDeletion) {
         throw new BadRequestError('Invalid credentials');
      }

      try {
         await deleteFile(existingDoctorForImageDeletion.profileImage);
      } catch (error) {
         throw new BadRequestError('Could not delete file from cloudinary');
      }


      const imageResult: UploadApiResponse = (await uploads(profileImage, `${objectFile}`)) as UploadApiResponse;

      if (!imageResult?.public_id) {
         throw new BadRequestError('File upload: Error ocurred. Try again.');
      }

      const existingDoctorForCache: IUserDocumentDoctor | undefined = await userService.updateProfileImageById(
         doctorID,
         `${imageResult.secure_url}`,
      );



     await  existingDoctorForCache.save();

      await userCache.updateInfoAndSaveToUserCache(`${existingDoctorForCache._id}`, existingDoctorForCache);

      // const cachedUser: IUserDocumentPatient = (await userCache.getUserFromCache(patientID)) as IUserDocumentPatient;
      // const existingPatientFromCache: IUserDocumentPatient = cachedUser
      //    ? cachedUser
      //    : await userServicePatient.getUserById(patientID);

      res.status(HTTP_STATUS.OK).json({ message: 'Doctor profile updated succesfully ', doctor: existingDoctorForCache });
   }
}
