import DeclarationGenerator from "./DeclarationGenerator";
import * as dom from "dts-dom";

// use unix-style newlines by default
// TODO: Make this configurable!
dom.config.outputEol = "\n";

/**
 * Generates TypeScript declarations for the provided CoffeeScript source.
 * @param coffeeScript The source file (written in CoffeeScript) to generate declarations for.
 * @param filename The path to the file with `coffeeScript` as its contents.
 * @returns Declarations for the provided `coffeeScript`.
 */
export function generateDeclarations(coffeeScript: string, filepath?: string): string {

    let declarations = new DeclarationGenerator(coffeeScript, filepath).generate();
    return declarations.map(dec => dom.emit(dec)).join("");
}
