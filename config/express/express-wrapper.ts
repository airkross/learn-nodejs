import fs from "fs";
import path from "path";
import express, { Express } from "express";
import bodyParser from "body-parser";
import { ROOT_PATH } from "../../constants";

export class ExpressWrapper {
    express!: Express;

    constructor() {
        this.express = express();
    }

    init() {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());

        const readRoutesFolder = (folderPath: string): void => {
            fs.readdirSync(folderPath).forEach((item) => {
                const itemPath = path.join(folderPath, item);

                if (fs.statSync(itemPath).isFile() && item === 'index.ts') {
                    import(itemPath).then((module) => {
                        const { router } = module.default.routerModule
                        if (typeof router === "function") {
                            this.express.use(router);
                        }
                    });
                } else if (fs.statSync(itemPath).isDirectory()) {
                    readRoutesFolder(itemPath);
                }
            });
        };
        readRoutesFolder(path.join(ROOT_PATH, "modules"));
    }

    start(port: number) {
        this.express.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}
