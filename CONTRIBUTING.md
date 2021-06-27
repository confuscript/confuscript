# Contributing

To contribute to this project, you are require to be able to use:
 - Yarn
 - If changing code, Typescript
 - If changing grammar, Nearley

If you are writing code and may potentially test it, both on your machine, you should run `yarn 
&& yarn build build` which will install all dependencies, link workspaces, and build every 
package once.

Typescript based packages shouldn't take long as esbuild and tsup are **very** fast, the only 
one that may take a long (ish) time is building the grammar.

If you will be changing code and may need to test on demand but don't want to keep running the 
build command, run `yarn build dev` which, on windows, will open a terminal with a new tab for 
each workspace that supports development building, and on linux, will run every development 
supporting build command in parallel.

## Commits

We try our best to conform to the commitizen/conventional-changelog/commitlint format. If on 
windows, use [commitlint.io](https://commitlint.io), if not, run `yarn cz`

## Pull requests

The titles of these should stay as close as possible to the format of commit messages.

## Issues

I will add issue templates soon.
