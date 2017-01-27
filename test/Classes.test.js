const path = require("path");
const fs = require("fs");

const chai = require("chai");
const dom = require("dts-dom");

const AssertExtensions = require("./AssertExtensions");
const assert = AssertExtensions.extend(chai.assert);

const DeclarationGenerator = require("../lib/DeclarationGenerator").default;

context("classes", function() {
    let declarations;

    before("generate declarations for Duck.coffee", function(done) {
        let filename = path.join(__dirname, "resources", "Duck.coffee")
        fs.readFile(filename, "utf-8", (err, coffeeSrc) => {
            const dg = new DeclarationGenerator(coffeeSrc, filename);
            declarations = dg.generate();
            done();
        });
    });

    it("returns a class", function() {
        const classes = declarations.filter(d => d.kind === "class");
        assert.equal(classes.length, 1, "Should return exactly one class");
        assert.equal(classes[0].name, "Duck", "Should have the same class name as in CoffeeScript");
    });

    context("the class", function() {
        let clazz;

        before("find first class", function() {
            clazz = declarations.filter(d => d.kind === "class")[0];
        });

        it("has a constructor", function() {
            let constructors = clazz.members.filter(m => m.kind === "constructor");
            assert.equal(constructors.length, 1, "Should have exactly one constructor");

            let ctor = constructors[0];
            assert.equal(ctor.parameters.length, 2, "Should have exactly two parameters");
            assert.equal(ctor.parameters[0].name, "name", "Parameter names should match");
            assert.isOptionalAny(ctor.parameters[0], "All parameters should be both optional and 'any' type");
            assert.equal(ctor.parameters[1].name, "weight", "Parameter names should match");
            assert.isOptionalAny(ctor.parameters[1], "All parameters should be both optional and 'any' type");
        });

        it("has members initialized in constructor", function() {
            let members = clazz.members.filter(m => m.name === "context" || m.name === "_state");
            assert.equal(members.length, 2, "Should have exactly two members initialized)");

            let context = members.filter(m => m.name === "context")[0];
            assert.equal(context.name, "context", "Member names should match");
            assert.equal(context.type, dom.type.any, "Members must be 'any' type");

            let state = members.filter(m => m.name === "_state")[0];
            assert.equal(state.name, "_state", "Member names should match");
            assert.equal(state.type, dom.type.any, "Members must be 'any' type");
            assert.equal(
                state.flags & dom.DeclarationFlags.Protected,
                dom.DeclarationFlags.Protected,
                "Properties prefixed with '_' must be protected"
            );
        });

        it("has a static property", function() {
            let statics = clazz.members.filter(m => m.name === "staticProp");
            assert.equal(statics.length, 1, "Should have a static property");

            let static = statics[0];
            assert.equal(
                static.flags & dom.DeclarationFlags.Static,
                dom.DeclarationFlags.Static,
                `${static.name} should be a static property`
            );
            assert.equal(static.name, "staticProp", "Property names should match");
            assert.equal(static.type, dom.type.any, "All properties must be 'any' type");
        });

        it("doesn't have closure-scoped properties", function() {
            let closureScoped = clazz.members.filter(m => m.name === "nonClassProp");
            assert.equal(
                closureScoped.length,
                0,
                "Classes should not have properties that are closure-scoped in CoffeeScript"
            );
        });

        it("has regular member properties", function() {
            let properties = clazz.members.filter(m => m.name === "hasBill");
            assert.equal(properties.length, 1, "Should have exactly one member property named 'hasBill'");

            let property = properties[0];
            assert.equal(property.name, "hasBill", "Property names should match");
            assert.equal(property.type, dom.type.any, "All properties must be 'any' type");
            assert.equal(property.flags, dom.DeclarationFlags.None, "Regular properties should be regular");
        });

        it("has methods", function() {
            let methods = clazz.members.filter(m => m.kind === "method");
            assert.equal(methods.length, 3, "Should have exactly three methods");

            let quack = methods.filter(m => m.name === "quack")[0];
            assert.equal(quack.name, "quack", "Method names should match");
            assert.equal(quack.parameters.length, 0, "Should accept zero parameters");
            assert.equal(quack.flags, dom.DeclarationFlags.None, "Quack should have no special flags");

            let flap = methods.filter(m => m.name === "flap")[0];
            assert.equal(flap.name, "flap", "Method names should match");
            assert.equal(flap.parameters.length, 1, "Should accept exactly one parameter");
            assert.equal(flap.parameters[0].name, "duration", "Parameter names must match");
            assert.isOptionalAny(flap.parameters[0], "All parameters should be both optional and 'any' type");
            assert.equal(flap.flags, dom.DeclarationFlags.None, "Flap should have no special flags");

            let eatBreadCrumbs = methods.filter(m => m.name === "_eatBreadCrumbs")[0];
            assert.equal(eatBreadCrumbs.name, "_eatBreadCrumbs", "Method names should match");
            assert.equal(eatBreadCrumbs.parameters.length, 1, "Should accept exactly one parameter");
            assert.equal(eatBreadCrumbs.parameters[0].name, "reaction", "Parameter names must match");
            assert.isOptionalAny(eatBreadCrumbs.parameters[0], "All parameters should be both optional and 'any' type");
            assert.equal(
                eatBreadCrumbs.flags & dom.DeclarationFlags.Protected,
                dom.DeclarationFlags.Protected,
                "Methods prefixed with '_' must be protected"
            );
        });

        it("has properties to match parameter properties", function() {
            let parameterProperties = clazz.members.filter(m => m.name === "reaction");
            assert.equal(
                parameterProperties.length,
                1,
                "Should have exactly one property named 'reaction', created from parameter property"
            );

            let reaction = parameterProperties[0];
            assert.equal(reaction.name, "reaction", "Property name should match parameter property name");
            assert.equal(reaction.type, dom.type.any, "All properties must be 'any' type");
            assert.equal(reaction.flags, dom.DeclarationFlags.None, "Parameter properties don't need special flags");
        });
    }); // the class
});
