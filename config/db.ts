import mongoose from "mongoose";

export interface DBConfig extends mongoose.ConnectOptions {
    host: string,
    port: number,
}

export class Database {
    config!: DBConfig

    constructor(config: DBConfig) {
        this.config = config
    }

    connect() {
        try {
            const { host, port, user, pass, authSource, authMechanism } = this.config
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
