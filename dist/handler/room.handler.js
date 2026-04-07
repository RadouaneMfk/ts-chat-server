"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = roomHandler;
const room_service_1 = require("../services/room.service");
async function joinRoom(socket, roomId) {
    socket.join(roomId);
    socket.emit("messagesHistory", await (0, room_service_1.getRoomMessages)(parseInt(roomId)));
    socket.to(roomId.toString()).emit("userJoined", socket.data.user);
}
function leaveRoom(socket, roomId) {
    socket.leave(roomId);
    socket.to(roomId).emit("userLeft", socket.data.user);
}
function roomHandler(io, socket) {
    socket.on("joinRoom", async (roomId) => {
        await joinRoom(socket, roomId);
    });
    socket.on("leaveRoom", (roomId) => {
        leaveRoom(socket, roomId);
    });
}
//# sourceMappingURL=room.handler.js.map