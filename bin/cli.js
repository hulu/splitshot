#! /usr/bin/env node
const splitshot = require("../lib/");

const fs = require("fs");
const yargs = require("yargs")
const argv = yargs
        .usage("Usage: $0 <file.coffee>")
        .demandCommand(1, "You must provide a CoffeeScript file to parse!")
        .example("$0 fresh.coffee > fresh.d.ts")
        .help("h")
        .alias("h", "help")
        .version()
        .wrap(yargs.terminalWidth()) // maximize output width
        .argv;

const sourceFile = argv._[0] || "";
if (!sourceFile.endsWith(".coffee")) {
    console.error(`Provided file '${sourceFile}' doesn't end in .coffee. It probably isn't CoffeeScript?`);
    process.exit(1);
}

const coffeeScript = fs.readFileSync(sourceFile, "utf8");
const declaration = splitshot.generateDeclarations(coffeeScript, sourceFile);
if (declaration) { console.log(declaration); }
