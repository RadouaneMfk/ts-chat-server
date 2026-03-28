"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalPrisma = global;
exports.prisma = globalPrisma.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalPrisma.prisma = exports.prisma;
//# sourceMappingURL=prisma.js.map