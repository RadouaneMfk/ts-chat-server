import express, {Request, Response} from "express";
import { configDotenv } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, SocketData } from "./types/socket.types";
// import {prisma} from "./config/prisma.js"
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import { HandleSocketAuth } from "./middleware/socket.middleware";
import cors from 'cors';
import { messageHandler } from "./handler/message.handler";
import { roomHandler } from "./handler/room.handler";
import path from "path";

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, "../client")));

const httpServer = createServer(app);

const io = new Server
    <ClientToServerEvents,
    ServerToClientEvents,
    {},
    SocketData>(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });

io.use(HandleSocketAuth);

io.on("connection", (socket) => {
    console.log(socket.data.user.username);
    roomHandler(io, socket);
    messageHandler(io, socket);
})

app.get("/health", (_req: Request, res: Response) => {
    return res.json({status: 'ok'});
})

app.use(errorHandler);

httpServer.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`);
})
