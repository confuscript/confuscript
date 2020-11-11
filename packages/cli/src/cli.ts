import { program } from "commander";
import run from "./cmds/run";

program.description("Confuscript command line interface")
    .version(require("../package.json").version)

program
    .command("run")
    .description("Run a project or file. (defaults to current project)")
    .action(run)

program.parse(process.argv)
