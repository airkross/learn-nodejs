import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { PORT } from "./constants";
import router from "./router";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(router);

try {
  mongoose.connect(`mongodb://localhost:27017`, {
    user: "admin",
    pass: "123",
    authSource: "todos-database",
    authMechanism: "DEFAULT",
  });

  app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
  });
} catch (error) {
  console.error("Error mongo connect", error);
}
