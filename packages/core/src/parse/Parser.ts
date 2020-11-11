import {Grammar, Parser as Parse} from "nearley";
import {resolve, sep} from "path"

export default class Parser {
    grammar: Grammar = Grammar.fromCompiled(require("@confuscript/lang"))
    parser: Parse = new Parse(this.grammar)

    rootpath: string
    start: {class: string, method: string, path: string}|undefined

    constructor(sourceroot: string, start: { path: string, class: string, method: string }, autostart?: boolean) {
        this.rootpath = sourceroot
        this.start = { class: start.class, method: start.method, path: start.path }
        if(autostart) {
            this.parse(start.path);
        }
    }

    parse(path: string) {
        let file = resolve(this.rootpath, path.split(".").join(sep) + ".co");
        console.log(file)
    }

    export() {
        return "hi"
    }

    public static create(sourceroot: string, start: string): Parser {
        let sides = start.split("@");
        return new Parser(sourceroot, {
            method: sides[1],
            path: sides[0],
            class: sides[0].split(".")[sides[0].split(".").length - 1]
        }, true)
    }
}
