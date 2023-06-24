"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
function deleteFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const publicId = extractPublicId(url); // Extract the public ID from the document URL
            const result = yield cloudinary_1.default.v2.uploader.destroy(publicId);
            console.log('Document deleted from Cloudinary:', result);
        }
        catch (error) {
            console.error('Error deleting document from Cloudinary:', error);
        }
    });
}
exports.deleteFile = deleteFile;
const extractPublicId = (url) => {
    const splitUrl = url.split('/');
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
};
//# sourceMappingURL=deleteCloudinaryFileByURL.js.map