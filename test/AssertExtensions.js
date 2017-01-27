const dom = require("dts-dom");

/**
 * Asserts that a dts-dom parameter is both optional and `any`.
 * @param {*} assert an instance of Chai's `assert` module.
 * @param {*} parameter the parameter to check.
 */
function isOptionalAny(assert, parameter) {
    assert.isNotNull(parameter, "Parameters cannot be null");
    assert.equal(parameter.type, dom.type.any, `Parameter '${parameter.name}' should have type 'any'`);
    assert.equal(
        parameter.flags & dom.ParameterFlags.Optional,
        dom.ParameterFlags.Optional,
        `Parameter '${parameter.name}' should be optional`
    );
};

module.exports.extend = function(assert) {
    return Object.assign(assert, {
        isOptionalAny: isOptionalAny.bind(null, assert),
    });
};
