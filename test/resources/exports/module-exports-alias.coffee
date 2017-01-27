ModuleName = module.exports
ModuleName.Foo = "Some string"
ModuleName.Bar = {
    someObjectLiteral: true
}
ModuleName.function = "fnucotin" # tests reserved word exports

ModuleName.getStuff = (anArgument) ->
    return ["stuff", "and more stuff"]

class TheMathematicsOfQuantumNeutrinoFields
    professor: "Professor Hubert Farnsworth"
    books: [":shrug:"]

    drop: ->
        console.log("Good riddence")

    @register: ->
        console.log("Good luck")

ModuleName.MQNF = TheMathematicsOfQuantumNeutrinoFields

ModuleName.ClassInSession = new TheMathematicsOfQuantumNeutrinoFields()

module.exports.InlineClass = class InternalName
    name: "Phillip J. Fry"

ModuleName.Reexport = require("./simple-module")
