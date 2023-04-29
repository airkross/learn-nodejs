import mongoose from "mongoose";
import { DatabaseWrapper } from "./database-wrapper";

export class TodosDatabase extends DatabaseWrapper {
    override connect() {
        try {
            const { host, port, user, pass, authSource, authMechanism } = this.config;
            mongoose.connect(`mongodb://${host}:${port}`, {
                user,
                pass,
                authSource,
                authMechanism,
            });
        } catch (error) {
            console.error("Error mongo connect", error);
        }
    }
}
