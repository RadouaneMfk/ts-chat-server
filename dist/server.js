import express from "express";
import { configDotenv } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
configDotenv();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer);
io.on("connection", (socket) => {
    console.log(socket.id);
});
app.get("/health", (_req, res) => {
    return res.json({ status: 'ok' });
});
httpServer.listen(PORT, () => {
    console.log(`server is running at port http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map