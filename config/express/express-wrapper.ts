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

        const pathFile = path.join(ROOT_PATH, "modules", "index.ts")

        import(pathFile).then((modules) => {
            for (let instenceName in modules) {
                const instence = new modules[instenceName]()
                const { router } = instence.router

                if (typeof router === "function") {
                    this.express.use(router);
                }
            }
        })
    }

    start(port: number) {
        this.express.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}
