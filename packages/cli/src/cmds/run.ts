import {Parser} from "@confuscript/core";
import {doConfig} from "@confuscript/core";
import { existsSync } from "fs";
import {resolve} from "path"

export default function run(opts: {debug?: boolean}) {
    if(!existsSync(resolve(process.cwd(), "project.json"))) throw new Error("Could not find project.json");
    let cfg = doConfig(resolve(process.cwd(), "project.json"));
    if(cfg.main === null) throw new Error("main property in project.json cannot be null or undefined")
    let parser = Parser.create(resolve(process.cwd(), cfg.src), cfg.main, !!opts?.debug);
}
