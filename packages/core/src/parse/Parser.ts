import {Grammar} from "nearley";

export default class Parser {
    grammar: Grammar = Grammar.fromCompiled(require("@confuscript/lang"))
}
