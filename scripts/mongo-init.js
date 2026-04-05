/* eslint-disable @typescript-eslint/no-require-imports */
const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.MONGODB_DB_NAME || "epyxderma";

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  await db.createCollection("clients").catch(ignoreNamespaceExists);
  await db.createCollection("campaigns").catch(ignoreNamespaceExists);
  await db.createCollection("mediaAssets").catch(ignoreNamespaceExists);
  await db.createCollection("deliveryLogs").catch(ignoreNamespaceExists);
  await db.createCollection("adminUsers").catch(ignoreNamespaceExists);

  await db.collection("clients").createIndexes([
    { key: { phone: 1 }, name: "client_phone_unique", unique: true },
    { key: { whatsappOptIn: 1, tags: 1 }, name: "client_optin_tags" },
  ]);

  await db.collection("campaigns").createIndexes([
    { key: { status: 1, scheduledAt: 1 }, name: "campaign_status_schedule" },
    { key: { lastDispatchedAt: -1 }, name: "campaign_last_dispatched" },
  ]);

  await db.collection("mediaAssets").createIndexes([
    { key: { uploadedAt: -1 }, name: "media_uploaded_at" },
  ]);

  await db.collection("deliveryLogs").createIndexes([
    { key: { campaignId: 1, clientId: 1 }, name: "delivery_campaign_client" },
    { key: { status: 1, sentAt: -1 }, name: "delivery_status_sent_at" },
  ]);

  await db.collection("adminUsers").createIndexes([
    { key: { username: 1 }, name: "admin_username_unique", unique: true },
    { key: { role: 1, status: 1 }, name: "admin_role_status" },
  ]);

  console.log(`MongoDB initialized for database: ${dbName}`);
  await client.close();
}

function ignoreNamespaceExists(error) {
  if (error && error.codeName === "NamespaceExists") {
    return;
  }

  throw error;
}

main().catch((error) => {
  console.error("Failed to initialize MongoDB", error);
  process.exitCode = 1;
});
