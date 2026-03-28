"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleSocketAuth = void 0;
const jwt_1 = require("../utils/jwt");
const HandleSocketAuth = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new Error('Unauthorized'));
        const verifiedUser = (0, jwt_1.verifyToken)(token);
        socket.data.user = verifiedUser;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.HandleSocketAuth = HandleSocketAuth;
//# sourceMappingURL=socket.middleware.js.map