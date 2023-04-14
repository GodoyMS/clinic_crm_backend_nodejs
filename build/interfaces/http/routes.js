"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = require("../../features/clinic/auth/routes/authRoutes");
const base_queue_1 = require("../../shared/globals/services/queues/base.queue");
const configEnvs_1 = require("../../configs/configEnvs");
const currentUser_1 = require("../../features/clinic/auth/routes/currentUser");
const auth_middleware_1 = require("../../shared/globals/helpers/middlewares/auth-middleware");
exports.default = (app) => {
    const routes = () => {
        app.use('/queues', base_queue_1.serverAdapter.getRouter());
        app.use(configEnvs_1.config.BASE_PATH, authRoutes_1.authRoutes.routes());
        app.use(configEnvs_1.config.BASE_PATH, authRoutes_1.authRoutes.signoutRoute());
        app.use(configEnvs_1.config.BASE_PATH, auth_middleware_1.authMiddleware.verifyUser, currentUser_1.currentUserRoutes.routes());
    };
    routes();
};
//# sourceMappingURL=routes.js.map