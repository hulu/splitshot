exports.Foo = "Some string"
exports.Bar = {
    someObjectLiteral: true
}
exports.function = "fnucotin" # tests reserved word exports

exports.getStuff = (anArgument) ->
    return ["stuff", "and more stuff"]

class TheMathematicsOfQuantumNeutrinoFields
    professor: "Professor Hubert Farnsworth"
    books: [":shrug:"]

    drop: ->
        console.log("Good riddence")

    @register: ->
        console.log("Good luck")

exports.MQNF = TheMathematicsOfQuantumNeutrinoFields

exports.ClassInSession = new TheMathematicsOfQuantumNeutrinoFields()

exports.InlineClass = class InternalName
    name: "Phillip J. Fry"

exports.Reexport = require("./simple-module")
