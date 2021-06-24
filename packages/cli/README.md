# `@confuscript/cli`

The CLI package is the package that you should use to interact with Confuscript (unless you are
creating your own build tool)

## Commands

```
Usage: co [options] [command]

0.0.0

Options:
  -v, --version    output the version number
  -h, --help       display help for command

Commands:
  build [options]  Builds the current project
  help [command]   display help for command
```

### Build

This command is the command you should use to build Confuscript. It doesn't take any meaningful
options as all options are passed using a config file. You can read more about
this [here](/docs/Getting%20Started/Config.md)
