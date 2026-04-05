import { Socket } from "socket.io";
import { getRoomMessages } from "../services/room.service";

export async function joinRoom(socket: Socket, roomId: number) {
    socket.join(roomId.toString());
    socket.emit("messagesHistory", await getRoomMessages(roomId));
    socket.to(roomId.toString()).emit("userJoined", socket.data.user);
}

export function leaveRoom(socket: Socket, roomId: number) {
    
}