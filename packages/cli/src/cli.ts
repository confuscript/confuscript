#!/bin/env node

import "source-map-support/register";
import { program } from "commander";
import buildCommand from "./command/build";

const pkg = require("../package.json");

program
    .version(pkg.version, "-v, --version")
    .name("co")
    .description(pkg.version);

program
    .command("build")
    .description("Builds the current project")
    .option("-d, --debug", "Prints all debug info for debugging purposes")
    .action(async (opts) => await buildCommand(opts));

program.parse(process.argv);
