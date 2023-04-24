import app from "./config/express";
import { DB_CONFIG, PORT } from "./constants";
import { Database } from "./config/db";

const db = new Database(DB_CONFIG);
db.connect();

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
