const path = require("path");
const fs = require("fs");

const chai = require("chai");
const dom = require("dts-dom");

const AssertExtensions = require("./AssertExtensions");
const assert = AssertExtensions.extend(chai.assert);

const DeclarationGenerator = require("../lib/DeclarationGenerator").default;

describe("class hierarchies", function() {
    let declarations;

    before("generate declarations for Subclass.coffee", function(done) {
        let filename = path.join(__dirname, "resources", "Subclass.coffee")
        fs.readFile(filename, "utf-8", (err, coffeeSrc) => {
            const dg = new DeclarationGenerator(coffeeSrc, filename);
            declarations = dg.generate();
            done();
        });
    });

    it("returns classes", function() {
        const classes = declarations.filter(d => d.kind === "class");
        assert.equal(classes.length, 2, "Should return exactly two classes");
        assert.sameOrderedMembers(
            classes.map(c => c.name),
            ["Base", "Subclass"],
            "Class declaration names should match CoffeeScript class names"
        );
    });

    describe("the subclass", function() {
        let subclass;

        before("find subclass", function() {
            subclass = declarations.filter(d => d.kind === "class" && d.name === "Subclass")[0];
        });

        it("extends the parent class", function() {
            assert.isNotNull(subclass.baseType, "Subclasses must have non-null base types");
            assert.equal(subclass.baseType.name, "Base", "Subclasses must use base type's name");
        });

        it("declares its own properties", function() {
            let subMethods = subclass.members.filter(m => m.name === "subMethod");
            let subProperties = subclass.members.filter(m => m.name === "subProperty");

            assert.equal(subMethods.length, 1, "Subclasses must declare their own methods ");
            assert.equal(subProperties.length, 1, "Subclasses must declare their own properties");
        });

        it("redeclares inherited properties", function() {
            let baseMethods = subclass.members.filter(m => m.name === "baseMethod");
            assert.equal(baseMethods.length, 1, "Subclasses should redeclare properties inherited from the base");
        });
    });
});
