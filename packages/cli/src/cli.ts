import "source-map-support/register"

import { program } from "commander";
import run from "./cmds/run";

program.description("Confuscript command line interface")
    .version(require("../package.json").version)

program
    .command("run")
    .description("Run a project or file. (defaults to current project)")
    .option("-d, --debug", "Output debug information and write parsed data (outputted by nearley and outputted by confuscript parser)")
    .action(run)

program.parse(process.argv)
