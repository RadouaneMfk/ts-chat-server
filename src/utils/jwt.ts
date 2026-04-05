import jwt, { SignOptions } from "jsonwebtoken"

interface UserPayload {
    id: number
    username: string
}

export function generateToken(user: UserPayload) : string {
    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES_IN || '7d';

    if (!secret)
        throw new Error('JWT_SECRET is not defined');

    return jwt.sign({id: user.id, username: user.username},
        process.env.JWT_SECRET as string,
        {expiresIn: expires as SignOptions["expiresIn"]}
    );
}

export function verifyToken(token: string) : UserPayload {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
        return decoded;
    } catch (error) {
        // console.log(error);
        throw new Error('Invalid Token');
    }
}
