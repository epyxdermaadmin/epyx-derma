import { MongoClient } from "mongodb";
import { appEnv } from "@/lib/env";

declare global {
  var __epyxdermaMongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(appEnv.MONGODB_URI);

export const mongoClientPromise =
  global.__epyxdermaMongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  global.__epyxdermaMongoClientPromise = mongoClientPromise;
}

export async function getDatabase() {
  const resolvedClient = await mongoClientPromise;
  return resolvedClient.db(appEnv.MONGODB_DB_NAME);
}
