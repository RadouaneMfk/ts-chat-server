import { Server, Socket } from "socket.io";
import { addRoomMember, getRoomMessages, removeRoomMember } from "../services/room.service";
import { UserInfo } from "../types/socket.types";

const roomUsers = new Map<string, UserInfo[]>();

async function joinRoom(io: Server, socket: Socket, roomId: string) {
    const users = roomUsers.get(roomId) || [];
    socket.join(roomId);
    users.push(socket.data.user);
    roomUsers.set(roomId, users);
    socket.emit("messagesHistory", await getRoomMessages(parseInt(roomId)));
    io.to(roomId).emit("roomUsers", users);
    socket.to(roomId.toString()).emit("userJoined", socket.data.user);
}

function leaveRoom(socket: Socket, roomId: string) {
    const users = roomUsers.get(roomId) || [];
    const updatedUsers = users.filter(u => u.id !== socket.data.user.id);
    roomUsers.set(roomId, updatedUsers);
    socket.leave(roomId);
    socket.to(roomId).emit("roomUsers", updatedUsers);
    socket.to(roomId).emit("userLeft", socket.data.user);
}

export function roomHandler(io: Server, socket: Socket) {
    socket.on("joinRoom", async (roomId: string) => {
        await joinRoom(io, socket, roomId);
        await addRoomMember(parseInt(socket.data.user.id), parseInt(roomId));
    });
    socket.on("leaveRoom", async (roomId: string) => {
        leaveRoom(socket, roomId);
        await removeRoomMember(parseInt(socket.data.user.id), parseInt(roomId));
    });
    socket.on("disconnect", () => {
        roomUsers.forEach((users, roomId) => {
            const isInRoom = users.some((u => u.id === socket.data.user.id));
            if (isInRoom)
            {
                const updatedUsers = users.filter(u => u.id !== socket.data.user.id);
                roomUsers.set(roomId, updatedUsers);
                socket.to(roomId).emit("roomUsers", updatedUsers);
                socket.to(roomId).emit("userLeft", socket.data.user);
            }
        })
    });
}
