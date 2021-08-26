const path = require("path");
const fs = require("fs");

const { assert } = require("chai");
const dom = require("dts-dom");

const AssertExtensions = require("./AssertExtensions");
AssertExtensions.extend(assert);

const DeclarationGenerator = require("../lib/DeclarationGenerator").default;

/**
 * Test case generator to ensure the correct properties are exported from a module.
 * @param {string} filename Absolute path to a CoffeeScript file that should be read and processed before these tests run.
 */
function checkExports(filename) {
    let declarations;

    before(`read ${path.relative(process.cwd(), filename)}`, function(done) {
        fs.readFile(filename, "utf-8", (err, coffeeSrc) => {
            const dg = new DeclarationGenerator(coffeeSrc, filename);
            declarations = dg.generate();
            done();
        });
    });

    it("exports properties", function() {
        let exportDeclarations = declarations.filter(
            // look for any properties/classes marked for export or any `Export=` or `ExportName` objects
            d => d.flags & dom.DeclarationFlags.Export || d.kind.startsWith("export")
        );
        const expecting = [...exportDeclarations.map(d => d.kind === "exportName" ? d.as : d.name)];

        assert.sameOrderedMembers(
            expecting,
            ["Foo", "Bar", "function", "getStuff", "MQNF", "ClassInSession", "InlineClass", "Reexport"],
            "Exported names must match CoffeeScript names"
        );
    });

    it("exports functions with correct parameters and return types", function() {
        let getStuff = declarations.filter(d => d.name === "getStuff")[0];
        assert.equal(getStuff.kind, "function", "Function properties must be exported as functions");

        assert.equal(
            getStuff.parameters.length,
            1,
            "Exported function must accept same number of parameters"
        );
        getStuff.parameters.map(assert.isOptionalAny);
        assert.equal(getStuff.returnType, "any", "Exported functions must return 'any'");
    });

    it("exports classes as properties", function() {
        let mqnfClass = declarations.filter(d => d.name === "TheMathematicsOfQuantumNeutrinoFields")[0];
        assert.equal(mqnfClass.kind, "class", "Exported classes must be of type 'class'");
        let mqnf = declarations.filter(d => d.as === "MQNF")[0];
        assert.equal(mqnf.name, "TheMathematicsOfQuantumNeutrinoFields", "Must export class by its name");
        assert.equal(mqnf.as, "MQNF", "Exported classes must support renaming during export");
    });

    it("exports classes defined inline with their public name", function() {
        let inlineClass = declarations.filter(d => d.name === "InlineClass")[0];
        assert.equal(inlineClass.kind, "class", "Exported inline classes must be of type 'class'");
    });

    it("exports class instances as properties", function() {
        let classInSession = declarations.filter(d => d.name === "ClassInSession")[0];
        assert.equal(classInSession.kind, "const", "Class instances must be exported as 'const's");
        assert.equal(
            classInSession.type.name,
            "TheMathematicsOfQuantumNeutrinoFields",
            "Class instances must have class name as their type"
        );
    });

    it("exports imported modules", function() {
        let require = declarations.filter(d => d.name === "_Reexport" || d.name === "Reexport")[0];
        assert.equal(require.kind, "import=", "Required modules must be imported with an 'import = ' statement");
        assert.equal(require.from, "./simple-module", "Imported modules must preserve the import path or name");

        let reexport = declarations.filter(d => d.as === "Reexport")[0];
        assert.equal(reexport.kind, "exportName", "Re-exported modules must use named exports");
        assert.include(reexport.name, "Reexport", "Re-exports must export the original name of the property");
        assert.equal(reexport.as, "Reexport", "Re-exports must rename the original property");
    });
}

describe("exports", function() {
    describe("module.exports property assignment", function() {
        checkExports(path.join(__dirname, "resources", "exports", "module-exports.coffee"));
    });

    describe("module.exports aliasing", function() {
        checkExports(path.join(__dirname, "resources", "exports", "module-exports-alias.coffee"));
    });

    describe("exports property assignment", function() {
        checkExports(path.join(__dirname, "resources", "exports", "exports.coffee"));
    });

    describe("exports aliasing", function() {
        checkExports(path.join(__dirname, "resources", "exports", "exports-alias.coffee"));
    });

    describe("module.exports overwrite", function () {
        it("overwrites export object with class", function(done) {
            const filename = path.join(__dirname, "resources", "exports", "export-equals-class.coffee");
            fs.readFile(filename, "utf-8", (err, coffeeSrc) => {
                const dg = new DeclarationGenerator(coffeeSrc, filename);
                const declarations = dg.generate();

                let exportEquals = declarations.filter(d => d.kind === "export=")[0];
                assert.equal(
                    exportEquals.target,
                    "TheMathematicsOfQuantumNeutrinoFields",
                    "Overwriting module.exports must use the class's name"
                );
                done();
            });
        });

        it("overwrites export object with instance of class", function(done) {
            const filename = path.join(__dirname, "resources", "exports", "export-equals-instance.coffee");
            fs.readFile(filename, "utf-8", (err, coffeeSrc) => {
                const dg = new DeclarationGenerator(coffeeSrc, filename);
                const declarations = dg.generate();

                let exportEquals = declarations.filter(d => d.kind === "export=")[0];
                let exportedConst = declarations.filter(d => d.kind === "const" && d.name === exportEquals.target)[0];
                assert.equal(
                    exportedConst.type.name,
                    "TheMathematicsOfQuantumNeutrinoFields",
                    "Must overwrite module.exports with a const of that class's type"
                );
                done();
            });
        });
    });
});
