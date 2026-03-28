import { Socket, Server, ExtendedError } from "socket.io";
import { verifyToken } from "../utils/jwt";

type NextFunction = (err?: ExtendedError) => void;

export const HandleSocketAuth = (socket: Socket, next: NextFunction) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new Error('Unauthorized'));
        const verifiedUser = verifyToken(token);
        socket.data.user = verifiedUser;
        next();
    } catch (error) {
        next(error as ExtendedError);
    }
}
