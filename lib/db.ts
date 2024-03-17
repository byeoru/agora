import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

db.sMSToken.findMany({ include: { user: true }, take: 10 });

export default db;
