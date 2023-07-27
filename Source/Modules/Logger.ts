import "colors";

export function Msg(Content: string, Prefix = "Twitter") {
    console.log(`${(new Date().toISOString()).gray} [${Prefix.green}] ${Content}`);
}

export function Warn(Content: string) {
    console.log(`${(new Date().toISOString()).gray} [${"WARNING".yellow}] ${Content}`);
}

export function Error(Content: string) {
    console.log(`${(new Date().toISOString()).gray} [${"ERROR".red}] ${Content}`);
}

export function Debug(Content: string, Prefix = "Twitter Debug") {
    if (process.env.ENVIRONMENT !== "Debug") return;
    console.log(`${(new Date().toISOString()).gray} [${("DEBUG | " + Prefix).magenta}] ${Content}`);
}
