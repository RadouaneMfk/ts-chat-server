"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = getRooms;
exports.createRoom = createRoom;
exports.getRoomMessages = getRoomMessages;
exports.addRoomMember = addRoomMember;
exports.removeRoomMember = removeRoomMember;
const prisma_1 = require("../config/prisma");
async function getRooms() {
    const rooms = await prisma_1.prisma.room.findMany();
    return rooms;
}
async function createRoom(name) {
    return await prisma_1.prisma.room.create({
        data: {
            name,
        }
    });
}
async function getRoomMessages(roomId) {
    const messages = await prisma_1.prisma.message.findMany({
        where: { roomId: roomId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            }
        },
        orderBy: {
            createdAt: 'asc',
        },
        take: 50,
    });
    return messages;
}
async function addRoomMember(userId, roomId) {
    await prisma_1.prisma.roomMember.upsert({
        where: {
            userId_roomId: { userId, roomId },
        },
        update: {},
        create: { userId, roomId },
    });
}
async function removeRoomMember(userId, roomId) {
    await prisma_1.prisma.roomMember.delete({
        where: {
            userId_roomId: { userId, roomId },
        }
    });
}
//# sourceMappingURL=room.service.js.map