import chalk from "chalk";

export class Logger {
    doDebug?: boolean;

    constructor(debug?: boolean) {
        this.doDebug = debug;
    }

    startHeader(...msgs: string[]) {
        this.log(chalk.blue("┌"), ...msgs);
    }

    info(...msgs: string[]) {
        this.log(chalk.blue("│  "), ...msgs);
    }

    debug(...msgs: string[]) {
        if (this.doDebug) this.log(chalk.magenta("┆  "), ...msgs);
    }

    warn(...msgs: string[]) {
        this.log(chalk.yellow("╞  "), ...msgs.map((m) => chalk.yellow(m)));
    }

    err(...msgs: string[]) {
        this.log(chalk.red("╘"), ...msgs.map((m) => chalk.red(m)));
    }

    subHeader(...msgs: string[]) {
        this.log(chalk.blue("├"), ...msgs);
    }

    endHeader(...msgs: string[]) {
        this.log(chalk.blue("└"), ...msgs);
    }

    log(...msgs: string[]) {
        console.log(msgs.join(" "));
    }
}
