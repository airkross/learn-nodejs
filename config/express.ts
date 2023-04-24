import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const __rootname = path.resolve(__dirname, '../')
const routesFolder = path.join(__rootname, "modules");

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

export default app