class Duck
    @staticProp = "Static"
    nonClassProp = "is closure-scoped"

    ###*
    # Creates a new TestClass.
    # @param {string} name The name of the duck.
    # @param {number} weight The weight of the duck, in ounces.
    ###
    constructor: (name, weight) ->
        @_state = {}
        @_state.name = name
        @_state.weight = weight
        @context = "some context"
        console.log(nonClassProp)

    ###*
    # Go quack.
    # @returns {string} What the duck says.
    ###
    quack: () ->
        return "quack"

    ###*
    # Flap for a while.
    # @param {number} duration The length of time (in seconds) to flap for.
    # @returns {string} A string describing how long the duck is flapping for.
    ###
    flap: (duration) ->
        return "flapping for #{duration} seconds"

    ###*
    # Eat some bread crumbs.
    # @returns {string} The duck's reaction to bread crumbs.
    ###
    _eatBreadCrumbs: (@reaction) ->
        return "Aww yiss"

    ###*
    # Whether or not this duck has a bill.
    ###
    hasBill: true
