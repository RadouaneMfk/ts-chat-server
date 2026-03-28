"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    if (err.message === 'Invalid username or password!')
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            error: err.message,
        });
    if (err.message === 'username already taken') {
        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            error: err.message,
        });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map