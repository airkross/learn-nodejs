import { PORT } from "./constants";
import app from "./config/express";
import { DBConfig, Database } from "./config/db";

const CONFIG: DBConfig = {
  host: "localhost",
  port: 27017,
  user: "admin",
  pass: "123",
  authSource: "todos-database",
  authMechanism: "DEFAULT",
};
const db = new Database(CONFIG);
db.connect();

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
