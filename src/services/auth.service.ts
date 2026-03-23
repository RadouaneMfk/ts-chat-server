import { generateToken } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const register = async(username: string, password: string) => {
    const userExist = await prisma.user.findUnique({
        where: {username: username}
    })

    if (userExist)
        throw new Error('username already taken');

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPass,
        }
    })
    return generateToken({id: user.id, username: user.username});
}

export const login = async(username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {username: username},
    })
    
    if (!user)
        throw new Error("Invalid username or password!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid username or password!");

    return generateToken({id: user.id, username: user.username});
}
