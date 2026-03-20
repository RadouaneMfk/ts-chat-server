import express, {Request, Response} from "express";
import { configDotenv } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, SocketData } from "./types/socket.types.js";

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const httpServer = createServer(app);

const io = new Server
    <ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData>(httpServer);

io.on("connection", (socket) => {
    console.log(socket.id);
})


app.get("/health", (_req: Request, res: Response) => {
    return res.json({status: 'ok'});
})

httpServer.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`);
})
