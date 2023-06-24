import cloudinary from 'cloudinary';

export async function deleteFile( url:string): Promise<void> {
  try {
    const publicId = extractPublicId(url); // Extract the public ID from the document URL
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log('Document deleted from Cloudinary:', result);
  } catch (error) {
    console.error('Error deleting document from Cloudinary:', error);
  }
}

const extractPublicId = (url: string): string => {
   const splitUrl = url.split('/');
   const publicIdWithExtension = splitUrl[splitUrl.length - 1];
   const publicId = publicIdWithExtension.split('.')[0];
   return publicId;
 };
