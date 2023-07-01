"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setupServer_bootstrap_1 = require("@bootstrap/setupServer.bootstrap");
const setupDatabase_bootstrap_1 = __importDefault(require("@bootstrap/setupDatabase.bootstrap"));
const configEnvs_1 = require("@configs/configEnvs");
class Application {
    initialize() {
        this.loadConfig();
        (0, setupDatabase_bootstrap_1.default)();
        const app = (0, express_1.default)();
        const server = new setupServer_bootstrap_1.ClinicsServer(app);
        server.start();
    }
    loadConfig() {
        configEnvs_1.config.validateConfig();
        configEnvs_1.config.cloudinaryConfig();
    }
}
const application = new Application();
application.initialize();
//# sourceMappingURL=app.js.map