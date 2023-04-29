import mongoose from "mongoose";

export interface DBConfig extends mongoose.ConnectOptions {
    host: string;
    port: number;
}

export class DatabaseWrapper {
    private _config!: DBConfig;

    constructor(config: DBConfig) {
        this._config = config;
    }

    get config(): DBConfig {
        return this._config;
    }

    protected connect(): void {}

    disconnect(): void {
        mongoose.disconnect();
    }
}
