import { Message, Room, User } from "@prisma/client";
import { prisma } from "../config/prisma";

export async function getRooms() : Promise<Room[]> {
    const rooms = await prisma.room.findMany();
    return rooms;
}

export async function getRoomMessages(roomId: number): Promise<(Message & {user: User})[]> {
	const messages = await prisma.message.findMany({
		where: {id: roomId},
		include: {
			user: true,
		},
		orderBy: {
			createdAt: 'asc',
		},
		take: 50,
	})
	return messages;
}