"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/auth.service");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const authRouter = express_1.default.Router();
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().trim().nonempty().min(5, "Username must be atleast 5 characters"),
    password: zod_1.z.string().trim().nonempty().min(8, "Password must be atleast 8 characters"),
});
const loginSchema = zod_1.z.object({
    username: zod_1.z.string().trim().nonempty().min(5, "Username must be atleast 5 characters"),
    password: zod_1.z.string().trim().nonempty().min(8, "Password must be atleast 8 characters"),
});
authRouter.post('/register', (0, express_async_handler_1.default)(async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: parsed.error.issues,
        });
        return;
    }
    const { username, password } = parsed.data;
    const token = await (0, auth_service_1.register)(username, password);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: 'you register successfully',
        token: token,
    });
}));
authRouter.post('/login', (0, express_async_handler_1.default)(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: parsed.error.issues,
        });
        return;
    }
    const { username, password } = parsed.data;
    const token = await (0, auth_service_1.login)(username, password);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'you log in successfully',
        token: token,
    });
}));
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map