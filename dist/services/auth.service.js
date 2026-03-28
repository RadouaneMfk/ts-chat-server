"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../config/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (username, password) => {
    const userExist = await prisma_1.prisma.user.findUnique({
        where: { username: username }
    });
    if (userExist)
        throw new Error('username already taken');
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPass = await bcryptjs_1.default.hash(password, salt);
    const user = await prisma_1.prisma.user.create({
        data: {
            username,
            password: hashedPass,
        }
    });
    return (0, jwt_1.generateToken)({ id: user.id, username: user.username });
};
exports.register = register;
const login = async (username, password) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { username: username },
    });
    if (!user)
        throw new Error("Invalid username or password!");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid username or password!");
    return (0, jwt_1.generateToken)({ id: user.id, username: user.username });
};
exports.login = login;
//# sourceMappingURL=auth.service.js.map