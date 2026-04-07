"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = getRooms;
exports.getRoomMessages = getRoomMessages;
const prisma_1 = require("../config/prisma");
async function getRooms() {
    const rooms = await prisma_1.prisma.room.findMany();
    return rooms;
}
async function getRoomMessages(roomId) {
    const messages = await prisma_1.prisma.message.findMany({
        where: { id: roomId },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
        take: 50,
    });
    return messages;
}
//# sourceMappingURL=room.service.js.map