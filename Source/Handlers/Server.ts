import { Msg } from "../Modules/Logger";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import env from "dotenv";
import "colors";

env.config();

export const Application = express();
Application.disable("etag");
Application.disable("x-powered-by");
Application.use(express.json());
Application.use(express.urlencoded({ extended: true }));
Application.use(cookieParser());

const Initialize = async (callback?: (() => void)) => {
    const IsJest = process.env.JEST_WORKER_ID !== undefined;
    const Path = IsJest ? path.join(".", "Source", "Routes") : path.join(".", Symbol.for("ts-node.register.instance") in process ? "Source" : "bin", "Routes");
    const Files = fs
        .readdirSync(Path)
        .filter((F) => F.endsWith(".js") || F.endsWith(".ts"));

    for (const File of Files) {
        const Contents = await import(path.join("..", "Routes", File));
        if (!Contents.default) continue;
        if (!Contents.default.App) continue;
        Application.use(Contents.default.DefaultAPI || "/", Contents.default.App);

        Msg(`Loaded route ${File.italic}!`, "Server");
    }

    /*Application.use((req, res) =>
        req.path.startsWith("/i/api")
            ? res.status(404).json({ code: 404, message: "404: Not Found" })
            : res.send(readFileSync("./Source/Static/FlowHTML.html").toString()),
    );*/
    return Application.listen(process.env.PORT, callback !== undefined ? callback : () => Msg(`Application now listening on port ${process.env.PORT?.green}`));
};