import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  MONGODB_URI: z.string().min(1).default("mongodb://127.0.0.1:27017"),
  MONGODB_DB_NAME: z.string().min(1).default("epyxderma"),
  UPLOAD_DIR: z.string().min(1).default("./uploads"),
  ADMIN_ROUTE_PREFIX: z.string().min(1).default("/epyxdermaadmin"),
  ADMIN_USERNAME: z.string().min(1).default("epyxdermaadmin"),
  ADMIN_PASSWORD: z.string().min(1).default("Epyx@test"),
  ADMIN_SESSION_SECRET: z.string().min(12).default("epyxderma-dev-secret"),
  WHATSAPP_PROVIDER: z.enum(["meta", "disabled"]).default("meta"),
  WHATSAPP_ACCESS_TOKEN: z.string().default(""),
  WHATSAPP_PHONE_NUMBER_ID: z.string().default(""),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().default(""),
  WHATSAPP_API_VERSION: z.string().default("v22.0"),
  WHATSAPP_DEFAULT_COUNTRY_CODE: z.string().default("91"),
});

export const appEnv = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
  ADMIN_ROUTE_PREFIX: process.env.ADMIN_ROUTE_PREFIX,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  WHATSAPP_PROVIDER: process.env.WHATSAPP_PROVIDER,
  WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  WHATSAPP_API_VERSION: process.env.WHATSAPP_API_VERSION,
  WHATSAPP_DEFAULT_COUNTRY_CODE: process.env.WHATSAPP_DEFAULT_COUNTRY_CODE,
});
