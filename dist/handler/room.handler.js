"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = roomHandler;
const room_service_1 = require("../services/room.service");
const roomUsers = new Map();
async function joinRoom(io, socket, roomId) {
    const users = roomUsers.get(roomId) || [];
    socket.join(roomId);
    users.push(socket.data.user);
    roomUsers.set(roomId, users);
    socket.emit("messagesHistory", await (0, room_service_1.getRoomMessages)(parseInt(roomId)));
    io.to(roomId).emit("roomUsers", users);
    socket.to(roomId.toString()).emit("userJoined", socket.data.user);
}
function leaveRoom(socket, roomId) {
    const users = roomUsers.get(roomId) || [];
    const updatedUsers = users.filter(u => u.id !== socket.data.user.id);
    roomUsers.set(roomId, updatedUsers);
    socket.leave(roomId);
    socket.to(roomId).emit("roomUsers", updatedUsers);
    socket.to(roomId).emit("userLeft", socket.data.user);
}
function roomHandler(io, socket) {
    socket.on("joinRoom", async (roomId) => {
        await joinRoom(io, socket, roomId);
        await (0, room_service_1.addRoomMember)(parseInt(socket.data.user.id), parseInt(roomId));
    });
    socket.on("leaveRoom", async (roomId) => {
        leaveRoom(socket, roomId);
        await (0, room_service_1.removeRoomMember)(parseInt(socket.data.user.id), parseInt(roomId));
    });
    socket.on("disconnect", () => {
        roomUsers.forEach((users, roomId) => {
            const isInRoom = users.some((u => u.id === socket.data.user.id));
            if (isInRoom) {
                const updatedUsers = users.filter(u => u.id !== socket.data.user.id);
                roomUsers.set(roomId, updatedUsers);
                socket.to(roomId).emit("roomUsers", updatedUsers);
                socket.to(roomId).emit("userLeft", socket.data.user);
            }
        });
    });
}
//# sourceMappingURL=room.handler.js.map