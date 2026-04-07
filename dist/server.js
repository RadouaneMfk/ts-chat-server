"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// import {prisma} from "./config/prisma.js"
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const socket_middleware_1 = require("./middleware/socket.middleware");
const cors_1 = __importDefault(require("cors"));
const message_handler_1 = require("./handler/message.handler");
const room_handler_1 = require("./handler/room.handler");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.configDotenv)();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../client")));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
io.use(socket_middleware_1.HandleSocketAuth);
io.on("connection", (socket) => {
    console.log(socket.data.user.username);
    (0, room_handler_1.roomHandler)(io, socket);
    (0, message_handler_1.messageHandler)(io, socket);
});
app.get("/health", (_req, res) => {
    return res.json({ status: 'ok' });
});
app.use(error_middleware_1.errorHandler);
httpServer.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map