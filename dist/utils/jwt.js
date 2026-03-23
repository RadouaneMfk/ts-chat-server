import jwt from "jsonwebtoken";
export function generateToken(user) {
    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES_IN || '7d';
    if (!secret)
        throw new Error('JWT_SECRET is not defined');
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: expires });
}
//# sourceMappingURL=jwt.js.map