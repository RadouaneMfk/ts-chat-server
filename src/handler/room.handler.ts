import { Server, Socket } from "socket.io";
import { getRoomMessages } from "../services/room.service";

async function joinRoom(socket: Socket, roomId: string) {
    socket.join(roomId);
    socket.emit("messagesHistory", await getRoomMessages(parseInt(roomId)));
    socket.to(roomId.toString()).emit("userJoined", socket.data.user);
}

function leaveRoom(socket: Socket, roomId: string) {
    socket.leave(roomId);
    socket.to(roomId).emit("userLeft", socket.data.user);
}

export function roomHandler(io: Server, socket: Socket) {
    socket.on("joinRoom", async (roomId: string) => {
        await joinRoom(socket, roomId);
    });
    socket.on("leaveRoom", (roomId: string) => {
        leaveRoom(socket, roomId);
    });
}
