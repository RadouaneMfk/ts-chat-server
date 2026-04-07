"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessage = saveMessage;
const prisma_1 = require("../config/prisma");
async function saveMessage(userId, roomId, content) {
    const message = await prisma_1.prisma.message.create({
        data: {
            userId,
            roomId,
            content,
        },
        include: {
            user: true,
        }
    });
    return message;
}
//# sourceMappingURL=message.service.js.map