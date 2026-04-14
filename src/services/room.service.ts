import { Message, Room, User } from "@prisma/client";
import { prisma } from "../config/prisma";

export async function getRooms() : Promise<Room[]> {
    const rooms = await prisma.room.findMany();
    return rooms;
}

export async function getRoomMessages(roomId: number): Promise<(Message & {user: {id: number, username: string}})[]> {
	const messages = await prisma.message.findMany({
		where: {roomId: roomId},
		include: {
			user: {
				select: {
					id: true,
					username: true,
				}
			}
		},
		orderBy: {
			createdAt: 'asc',
		},
		take: 50,
	})
	return messages;
}

export async function addRoomMember(userId: number, roomId: number) {
	await prisma.roomMember.upsert({
		where: {
			userId_roomId: {userId, roomId},
		},
		update: {},
		create: {userId, roomId},
	})
}

export async function removeRoomMember(userId: number, roomId: number) {
	await prisma.roomMember.delete({
		where: {
			userId_roomId: {userId, roomId},
		}
	})
}
