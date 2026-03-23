import express, {Request, Response} from "express";
import { configDotenv } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, SocketData } from "./types/socket.types.js";
import {prisma} from "./config/prisma.js"
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

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

app.use(errorHandler);

httpServer.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`);
})

