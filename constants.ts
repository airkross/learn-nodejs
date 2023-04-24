import { DBConfig } from "./config/db";

export const PORT = 3000;
export const DB_CONFIG: DBConfig = {
  host: "localhost",
  port: 27017,
  user: "admin",
  pass: "123",
  authSource: "todos-database",
  authMechanism: "DEFAULT",
};
