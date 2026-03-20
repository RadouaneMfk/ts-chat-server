export interface MessagePayload {
    content: string
    userId: string
    roomId: string
    time: Date
}

export interface UserInfo {
    id: string
    username: string
}

export interface ClientToServerEvents {
    joinRoom: (roomId: string) => void
    leaveRoom: (roomId: string) => void
    sendMessage: (content: string, roomId: string) => void
    typing: (payload: UserInfo, roomId: string) => void
}

export interface ServerToClientEvents {
    message: (payload: MessagePayload) => void
    userJoined: (payload: UserInfo) => void
    userLeft: (payload: UserInfo) => void
    roomUsers: (users: UserInfo[]) => void
}

export interface SocketData {
    user: UserInfo
}
