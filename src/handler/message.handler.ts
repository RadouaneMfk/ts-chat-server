import { Server, Socket } from "socket.io";
import { saveMessage } from "../services/message.service";
import { MessagePayload } from "../types/socket.types";

export function messageHandler(io: Server, socket: Socket) {
    socket.on("sendMessage", async (content: string, roomId: string) => {
        const user = socket.data.user;
        const savedMessage = await saveMessage(parseInt(user.id), parseInt(roomId), content);
        const payload: MessagePayload = {
            content: savedMessage.content,
            userId: savedMessage.userId.toString(),
            username: socket.data.user.username,
            roomId: savedMessage.roomId.toString(),
            time: savedMessage.createdAt,

        }
        io.to(roomId).emit("message", payload);
    })
    socket.on("typing", (roomId: string) => {
        socket.to(roomId).emit('userTyping', socket.data.user);
    })
}
