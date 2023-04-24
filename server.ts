import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { PORT } from "./constants";

const app = express();

const routesFolder = path.join(__dirname, "modules");
const readRoutesFolder = (folderPath: string): void => {
  const folderItems = fs.readdirSync(folderPath);
  folderItems.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    if (fs.statSync(itemPath).isFile() && item.endsWith(".routes.ts")) {
      import(itemPath).then((module) => app.use(module.default));
    } else if (fs.statSync(itemPath).isDirectory()) {
      readRoutesFolder(itemPath);
    }
  });
};
readRoutesFolder(routesFolder);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
