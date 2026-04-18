import express from "express"
import expressAsyncHandler from "express-async-handler";
import { createRoom, getRooms } from "../services/room.service";
import z from "zod";
import { StatusCodes } from "http-status-codes";

const roomRoutes = express.Router();

const roomSchema = z.object({
    name: z.string().trim().nonempty().min(5, "name of the room must be atleast 5 characters"),
})

roomRoutes.get("/", expressAsyncHandler(async (req, res) => {
    const rooms = await getRooms();
    res.json(rooms);
}))

roomRoutes.post("/", expressAsyncHandler(async (req, res) => {
    const parsed = roomSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            errors: parsed.error.issues,
        })
        return;
    }
    const {name} = parsed.data;
    const room = await createRoom(name);
    res.status(StatusCodes.CREATED).json({
        message: "you created the room successfully",
        room: room,
    })
}))

export default roomRoutes;
