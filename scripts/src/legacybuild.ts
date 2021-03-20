import { spawn } from "child_process";
import { existsSync, readdirSync } from "fs";
import { resolve, sep } from "path";

const paths: string[] = [];
const rt = resolve(__dirname, "../../packages");
console.log(resolve(__dirname, "../../"));

for (const path of readdirSync(rt)) {
    if (existsSync(resolve(rt, path, "tsconfig.json"))) {
        paths.push(path);
    }
}

if (process.argv.includes("--dev") || process.argv.includes("-d")) {
    if (process.platform === "win32") {
        let cmd = "wt ";

        for (const path of paths) {
            const name = path.split(sep)[path.split(sep).length - 1];
            cmd += `new-tab --title @confuscript/${name} --startingDirectory ./ yarn.cmd workspace @confuscript/${name} tsc -w; `;
        }

        const cmd2 = cmd.replace(/; $/, "").split(" ");

        console.log("RUNNING " + cmd);
        spawn(<string>cmd2.shift(), cmd2, {
            stdio:
                process.argv.includes("--verbose") ||
                process.argv.includes("-v")
                    ? "inherit"
                    : undefined,
            cwd: resolve(__dirname, "../../"),
        }).on("close", (code) => {
            process.exit(code || 0);
        });
    }
} else {
    nextBuild(0);
}

function nextBuild(i: number) {
    if (paths[i] !== undefined) {
        console.log("building " + paths[i]);
        const cmd = `yarn${
            process.platform === "win32" ? ".cmd" : ""
        } workspace @confuscript/${paths[i]} tsc`.split(" ");
        console.log("RUNNING " + cmd.join(" "));
        spawn(<string>cmd.shift(), cmd, {
            stdio:
                process.argv.includes("--verbose") ||
                process.argv.includes("-v")
                    ? "inherit"
                    : undefined,
            cwd: resolve(__dirname, "../../"),
        }).on("close", (code) => {
            if (code !== 0) {
                process.exit(code || 0);
            } else {
                nextBuild(i + 1);
            }
        });
    }
}
