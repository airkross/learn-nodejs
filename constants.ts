import { DBConfig } from "./config/database/database-wrapper";

export const PORT = 3000;
export const DB_CONFIG: DBConfig = {
    host: "localhost",
    port: 27017,
    user: "admin",
    pass: "123",
    dbName: 'todos-database',
    authSource: "todos-database",
    authMechanism: "DEFAULT",
};

export const ROOT_PATH = __dirname;
