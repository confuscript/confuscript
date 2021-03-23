import "source-map-support/register";
import { program } from "commander";
import build from "./cmd/build";

program
    .name("Confuscript")
    .version("0.0.1")
    .description("Confuscript's command line interface");

program
    .command("build")
    .description("Build project to all compilation targets")
    .option("-c, --config <path>", "Use a different project config")
    .action((options) => build(options));

program.parse(process.argv);
