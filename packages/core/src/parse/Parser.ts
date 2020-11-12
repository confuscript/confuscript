import {existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import {Grammar, Parser as Parse} from "nearley";
import {resolve, sep} from "path"
import File from "../structures/File"
import {NearleyOutput} from "../structures/output";

export default class Parser {
    debug: boolean = false;

    grammar: Grammar = Grammar.fromCompiled(require("@confuscript/lang"))
    parser: Parse = new Parse(this.grammar)

    rootpath: string
    start: {class: string, method: string, path: string}

    filedata: Map<String, File> = new Map();

    constructor(sourceroot: string, start: { path: string, class: string, method: string }, autostart?: boolean) {
        this.rootpath = sourceroot
        this.start = { class: start.class, method: start.method, path: start.path }
        if(autostart) {
            this.parse(start.path);
        }
    }

    parse(path: string) {
        let file = resolve(this.rootpath, path.split(".").join(sep) + ".co");
        let f = new File(file);
        let data = readFileSync(file);
        this.parser.feed(data.toString("utf-8"));
        let parsed: NearleyOutput = this.parser.finish()[0];
        if(this.debug && existsSync(resolve(this.rootpath, "../", "project.json"))) {
            let ppath = resolve(this.rootpath, "../debug", path.split(".").join(sep) + ".co.json").split(sep);
            ppath.pop();
            mkdirSync(ppath.join(sep), {recursive: true});
            writeFileSync(resolve(this.rootpath, "../debug", path.split(".").join(sep) + ".co.json"), JSON.stringify(parsed, null, 2))
        }
        f.start(parsed);
        this.filedata.set(file, f);
    }

    export(): ExportedParserData {
        return {
            rootpath: this.rootpath,
            start: this.start
        }
    }

    public static create(sourceroot: string, start: string, debug?: boolean): Parser {
        let sides = start.split("@");
        let parse = new Parser(sourceroot, {
            method: sides[1],
            path: sides[0],
            class: sides[0].split(".")[sides[0].split(".").length - 1]
        }, false);
        if(debug) {
            parse.debug = true;
        }
        parse.parse(parse.start.path);
        return parse;
    }
}

export interface ExportedParserData {
    rootpath: string
    start: {class: string, method: string, path: string}
}
