import { ExpressWrapper } from "./config/express/express-wrapper";
import { DB_CONFIG, PORT } from "./constants";
import { TodosDatabase } from "./config/database/todos-database";

class App {
    db!: TodosDatabase;
    express!: ExpressWrapper;

    constructor() {
        this.db = new TodosDatabase(DB_CONFIG);
        this.express = new ExpressWrapper();

        this.init();
    }

    protected init(): void {
        this.express.init();
    }

    start(): void {
        this.db.connect();
        this.express.start(PORT);
    }
}

new App().start();
