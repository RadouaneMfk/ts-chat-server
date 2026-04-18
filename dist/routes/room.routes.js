"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const room_service_1 = require("../services/room.service");
const zod_1 = __importDefault(require("zod"));
const http_status_codes_1 = require("http-status-codes");
const roomRoutes = express_1.default.Router();
const roomSchema = zod_1.default.object({
    name: zod_1.default.string().trim().nonempty().min(5, "name of the room must be atleast 5 characters"),
});
roomRoutes.get("/", (0, express_async_handler_1.default)(async (req, res) => {
    const rooms = await (0, room_service_1.getRooms)();
    res.json(rooms);
}));
roomRoutes.post("/", (0, express_async_handler_1.default)(async (req, res) => {
    const parsed = roomSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: parsed.error.issues,
        });
        return;
    }
    const { name } = parsed.data;
    const room = await (0, room_service_1.createRoom)(name);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: "you created the room successfully",
        room: room,
    });
}));
exports.default = roomRoutes;
//# sourceMappingURL=room.routes.js.map