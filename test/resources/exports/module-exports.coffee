module.exports.Foo = "Some string"
module.exports.Bar = {
    someObjectLiteral: true
}
module.exports.function = "fnucotin" # tests reserved word exports

module.exports.getStuff = (anArgument) ->
    return ["stuff", "and more stuff"]

class TheMathematicsOfQuantumNeutrinoFields
    professor: "Professor Hubert Farnsworth"
    books: [":shrug:"]

    drop: ->
        console.log("Good riddence")

    @register: ->
        console.log("Good luck")

module.exports.MQNF = TheMathematicsOfQuantumNeutrinoFields

module.exports.ClassInSession = new TheMathematicsOfQuantumNeutrinoFields()

module.exports.InlineClass = class InternalName
    name: "Phillip J. Fry"

module.exports.Reexport = require("./simple-module")
