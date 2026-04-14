import express from "express"
import expressAsyncHandler from "express-async-handler";
import { getRooms } from "../services/room.service";

const roomRoutes = express.Router();

roomRoutes.get("/rooms", expressAsyncHandler(async (req, res) => {
    const rooms = await getRooms();
    res.json(rooms);
}))

