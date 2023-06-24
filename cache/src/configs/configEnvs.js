"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
dotenv_1.default.config({});
class Config {
    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN;
        this.NODE_ENV = process.env.NODE_ENV;
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.SERVER_PORT = process.env.SERVER_PORT;
        this.PORT = process.env.PORT;
        this.REDIS_HOST = process.env.REDIS_HOST;
        this.CLOUD_NAME = process.env.CLOUD_NAME;
        this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
        this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
        this.SALT_ROUND = process.env.SALT_ROUND;
        this.CLOUD_DOMAIN = process.env.CLOUD_DOMAIN;
        this.BASE_PATH_CLINIC = process.env.BASE_PATH_CLINIC;
        this.BASE_PATH_PATIENT = process.env.BASE_PATH_PATIENT;
        this.SENDER_EMAIL = process.env.SENDER_EMAIL;
        this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD;
        this.SENGRID_API_KEY = process.env.SENGRID_API_KEY;
        this.SENGRID_SENDER = process.env.SENGRID_SENDER;
    }
    validateConfig() {
        console.log(this);
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`Configuration ${key} is undefined`);
            }
        }
    }
    cloudinaryConfig() {
        cloudinary_1.default.v2.config({
            cloud_name: this.CLOUD_NAME,
            api_key: this.CLOUD_API_KEY,
            api_secret: this.CLOUD_API_SECRET
        });
    }
}
exports.config = new Config();
//# sourceMappingURL=configEnvs.js.map