# 💬 Real-time Chat Server

A real-time chat application built with **TypeScript**, **Node.js**, **Socket.io**, and **PostgreSQL**, containerized with **Docker**.

---

## 🚀 Tech Stack

| Layer | Tool |
|---|---|
| Language | TypeScript (strict) |
| Framework | Express |
| WebSockets | Socket.io |
| Auth | JWT + bcrypt |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Containers | Docker + Docker Compose |

---

## ✨ Features

- JWT authentication (register / login)
- Real-time messaging with Socket.io
- Chat rooms, join, leave, message history
- Online presence, see who is in the room
- Typing indicators
- Persistent sessions (no logout on refresh)
- Fully typed Socket.io events end-to-end
- Simple HTML/JS frontend

---

## 📦 Prerequisites

- Docker
- Docker Compose

---

## ⚙️ Setup & Run

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/chat-server.git
cd chat-server
```

**2. Create `.env` file**
```env
PORT=3000
DATABASE_URL=postgresql://chatuser:chatpass@postgres:5432/chatdb
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**3. Start with Docker**
```bash
docker-compose up --build
```

**4. Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
chat-server/
├── src/
│   ├── config/         # Prisma client
│   ├── handler/        # Socket.io event handlers
│   ├── middleware/      # Auth & error middleware
│   ├── routes/         # Express routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript interfaces
│   └── server.ts       # Entry point
├── prisma/
│   └── schema.prisma   # DB schema
├── client/
│   └── index.html      # Frontend
├── Dockerfile
└── docker-compose.yml
```

---

## 🔌 API Endpoints

```
POST /auth/register   → register a new user
POST /auth/login      → login and get JWT token
GET  /rooms           → list all rooms
POST /rooms           → create a new room
```

---

## 📡 Socket Events

**Client → Server**
```
joinRoom      (roomId)
leaveRoom     (roomId)
sendMessage   (content, roomId)
typing        (roomId)
```

**Server → Client**
```
messagesHistory   (messages[])
message           (payload)
roomUsers         (users[])
userJoined        (user)
userLeft          (user)
userTyping        (user)
```

---

## 👤 Author

**Radouane Mouafik**  [GitHub](https://github.com/RadouaneMfk)