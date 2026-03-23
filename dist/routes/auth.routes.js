import express from "express";
import { login, register } from "../services/auth.service.js";
import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
const authRouter = express.Router();
const registerSchema = z.object({
    username: z.string().trim().nonempty().min(5, "Username must be atleast 5 characters"),
    password: z.string().trim().nonempty().min(8, "Password must be atleast 8 characters"),
});
const loginSchema = z.object({
    username: z.string().trim().nonempty().min(5, "Username must be atleast 5 characters"),
    password: z.string().trim().nonempty().min(8, "Password must be atleast 8 characters"),
});
authRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: parsed.error.issues,
        });
        return;
    }
    const { username, password } = parsed.data;
    const token = await register(username, password);
    res.status(StatusCodes.CREATED).json({
        message: 'you register successfully',
        token: token,
    });
}));
authRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: parsed.error.issues,
        });
        return;
    }
    const { username, password } = parsed.data;
    const token = await login(username, password);
    res.status(StatusCodes.OK).json({
        message: 'you log in successfully',
        token: token,
    });
}));
export default authRouter;
//# sourceMappingURL=auth.routes.js.map