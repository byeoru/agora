import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// db.$extends({
//   query: {
//     $allModels: {
//       async create({ model, operation, args, query }) {

//         query(args);
//       },
//     },
//   },
// });

export default db;
