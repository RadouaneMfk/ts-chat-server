"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(user) {
    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES_IN || '7d';
    if (!secret)
        throw new Error('JWT_SECRET is not defined');
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: expires });
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        // console.log(error);
        throw new Error('Invalid Token');
    }
}
//# sourceMappingURL=jwt.js.map