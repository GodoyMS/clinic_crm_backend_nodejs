"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadMulter = (0, multer_1.default)({ storage });
exports.upload = uploadMulter.single('pdf');
const uploadFile = (req, res) => {
    res.send({ data: 'Enviar archivo' });
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=storage.js.map