import { prisma } from "../config/prisma";

export async function saveMessage(userId: number, roomId: number, content: string) {
    const message = await prisma.message.create({
        data: {
            userId,
            roomId,
            content,
        },
        include: {
            user: true,
        }
    })
    return message;
}
