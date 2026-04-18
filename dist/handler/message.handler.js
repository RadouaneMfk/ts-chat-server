"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = messageHandler;
const message_service_1 = require("../services/message.service");
function messageHandler(io, socket) {
    socket.on("sendMessage", async (content, roomId) => {
        const user = socket.data.user;
        const savedMessage = await (0, message_service_1.saveMessage)(parseInt(user.id), parseInt(roomId), content);
        const payload = {
            content: savedMessage.content,
            userId: savedMessage.userId.toString(),
            username: socket.data.user.username,
            roomId: savedMessage.roomId.toString(),
            time: savedMessage.createdAt,
        };
        io.to(roomId).emit("message", payload);
    });
    socket.on("typing", (roomId) => {
        socket.to(roomId).emit('userTyping', socket.data.user);
    });
}
//# sourceMappingURL=message.handler.js.map