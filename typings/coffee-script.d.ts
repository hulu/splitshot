export function nodes(coffescript: string): Base;

export interface LocationData {
    first_line: number,
    first_column: number
}

export class CodeFragment {
    type: any;

    locationData: any;

    code: any;

    constructor(parent?: any, code?: any);

    toString(): any;

}

export class Base {
    compile(o?: any, lvl?: any): any;

    compileToFragments(o?: any, lvl?: any): any;

    compileClosure(o?: any): any;

    cache(o?: any, level?: any, isComplex?: any): any;

    cacheToCodeFragments(cacheValues?: any): any;

    makeReturn(res?: any): any;

    contains(pred?: any): any;

    lastNonComment(list?: any): any;

    toString(idt?: any, name?: any): any;

    eachChild(func?: any): any;

    traverseChildren(crossScope?: any, func?: any): any;

    invert(): any;

    unwrapAll(): any;

    children: any;

    isStatement(): any;

    jumps(): any;

    isComplex(): any;

    isChainable(): any;

    isAssignable(): any;

    isNumber(): any;

    unwrap(): any;

    unfoldSoak(): any;

    assigns(): any;

    updateLocationDataIfMissing(locationData?: any): any;

    locationData: LocationData;

    error(message?: any): any;

    makeCode(code?: any): any;

    wrapInBraces(fragments?: any): any;

    joinFragmentArrays(fragmentsList?: any, joinStr?: any): any;

}

export class Block extends Base {
    expressions: any;

    constructor(nodes?: any);

    children: any;

    push(node?: any): any;

    pop(): any;

    unshift(node?: any): any;

    unwrap(): any;

    isEmpty(): any;

    isStatement(o?: any): any;

    jumps(o?: any): any;

    makeReturn(res?: any): any;

    compileToFragments(o?: any, level?: any): any;

    compileNode(o?: any): any;

    compileRoot(o?: any): any;

    compileWithDeclarations(o?: any): any;

    static wrap: any;

}

export class Literal extends Base {
    value: any;

    constructor(value?: any);

    isComplex(): any;

    assigns(name?: any): any;

    compileNode(o?: any): any;

    toString(): any;

}

export class NumberLiteral extends Literal {
}

export class InfinityLiteral extends NumberLiteral {
    compileNode(): any;

}

export class NaNLiteral extends NumberLiteral {
    constructor();

    compileNode(o?: any): any;

}

export class StringLiteral extends Literal {
}

export class RegexLiteral extends Literal {
}

export class PassthroughLiteral extends Literal {
}

export class IdentifierLiteral extends Literal {
    isAssignable(): any;

}

export class PropertyName extends Literal {
    isAssignable(): any;

}

export class StatementLiteral extends Literal {
    isStatement(): any;

    makeReturn(): any;

    jumps(o?: any): any;

    compileNode(o?: any): any;

}

export class ThisLiteral extends Literal {
    constructor();

    compileNode(o?: any): any;

}

export class UndefinedLiteral extends Literal {
    constructor();

    compileNode(o?: any): any;

}

export class NullLiteral extends Literal {
    constructor();

}

export class BooleanLiteral extends Literal {
}

export class Return extends Base {
    expression: any;

    constructor(expression?: any);

    children: any;

    isStatement(): any;

    makeReturn(): any;

    jumps(): any;

    compileToFragments(o?: any, level?: any): any;

    compileNode(o?: any): any;

}

export class YieldReturn extends Return {
    compileNode(o?: any): any;

}

export class Value extends Base {
    properties: any;

    base: any;

    constructor(base?: any, props?: any, tag?: any);

    children: any;

    add(props?: any): any;

    hasProperties(): any;

    bareLiteral(type?: any): any;

    isArray(): any;

    isRange(): any;

    isComplex(): any;

    isAssignable(): any;

    isNumber(): any;

    isString(): any;

    isRegex(): any;

    isUndefined(): any;

    isNull(): any;

    isBoolean(): any;

    isAtomic(): any;

    isNotCallable(): any;

    isStatement(o?: any): any;

    assigns(name?: any): any;

    jumps(o?: any): any;

    isObject(onlyGenerated?: any): any;

    isSplice(): any;

    looksStatic(className?: any): any;

    unwrap(): any;

    cacheReference(o?: any): any;

    compileNode(o?: any): any;

    unfoldSoak(o?: any): any;

}

export class Comment extends Base {
    comment: any;

    constructor(comment?: any);

    isStatement(): any;

    makeReturn(): any;

    compileNode(o?: any, level?: any): any;

}

export class Call extends Base {
    variable: any;

    args: any;

    soak: any;

    isNew: any;

    constructor(variable?: any, args?: any, soak?: any);

    children: any;

    updateLocationDataIfMissing(locationData?: any): any;

    newInstance(): any;

    unfoldSoak(o?: any): any;

    compileNode(o?: any): any;

    compileSplat(o?: any, splatArgs?: any): any;

}

export class SuperCall extends Call {
    isBare: any;

    constructor(args?: any);

    superReference(o?: any): any;

    superThis(o?: any): any;

}

export class RegexWithInterpolations extends Call {
    constructor(args?: any);

}

export class TaggedTemplateCall extends Call {
    constructor(variable?: any, arg?: any, soak?: any);

    compileNode(o?: any): any;

}

export class Extends extends Base {
    child: any;

    parent: any;

    constructor(child?: any, parent?: any);

    children: any;

    compileToFragments(o?: any): any;

}

export class Access extends Base {
    name: any;

    soak: any;

    constructor(name?: any, tag?: any);

    children: any;

    compileToFragments(o?: any): any;

    isComplex(): any;

}

export class Index extends Base {
    index: any;

    constructor(index?: any);

    children: any;

    compileToFragments(o?: any): any;

    isComplex(): any;

}

export class Range extends Base {
    from: any;

    to: any;

    children: any;

    equals: any;

    exclusive: any;

    constructor(from?: any, to?: any, tag?: any);

    compileVariables(o?: any): any;

    compileNode(o?: any): any;

    compileArray(o?: any): any;

}

export class Slice extends Base {
    range: any;

    children: any;

    constructor(range?: any);

    compileNode(o?: any): any;

}

export class Obj extends Base {
    generated: any;

    objects: any;

    constructor(props?: any, generated?: any);

    children: any;

    compileNode(o?: any): any;

    assigns(name?: any): any;

}

export class Arr extends Base {
    objects: any;

    constructor(objs?: any);

    children: any;

    compileNode(o?: any): any;

    assigns(name?: any): any;

}

export class Class extends Base {
    variable: any;

    parent: any;

    body: any;

    boundFuncs: any;

    constructor(variable?: any, parent?: any, body?: any);

    children: any;

    defaultClassVariableName: any;

    determineName(): any;

    setContext(name?: any): any;

    addBoundFunctions(o?: any): any;

    addProperties(node?: any, name?: any, o?: any): any;

    walkBody(name?: any, o?: any): any;

    hoistDirectivePrologue(): any;

    ensureConstructor(name?: any): any;

    compileNode(o?: any): any;

}

export class ModuleDeclaration extends Base {
    clause: any;

    source: any;

    constructor(clause?: any, source?: any);

    children: any;

    isStatement(): any;

    jumps(): any;

    makeReturn(): any;

    checkSource(): any;

    checkScope(o?: any, moduleDeclarationType?: any): any;

}

export class ImportDeclaration extends ModuleDeclaration {
    compileNode(o?: any): any;

}

export class ImportClause extends Base {
    defaultBinding: any;

    namedImports: any;

    constructor(defaultBinding?: any, namedImports?: any);

    children: any;

    compileNode(o?: any): any;

}

export class ExportDeclaration extends ModuleDeclaration {
    compileNode(o?: any): any;

}

export class ExportNamedDeclaration extends ExportDeclaration {
}

export class ExportDefaultDeclaration extends ExportDeclaration {
}

export class ExportAllDeclaration extends ExportDeclaration {
}

export class ModuleSpecifierList extends Base {
    specifiers: any;

    constructor(specifiers?: any);

    children: any;

    compileNode(o?: any): any;

}

export class ImportSpecifierList extends ModuleSpecifierList {
}

export class ExportSpecifierList extends ModuleSpecifierList {
}

export class ModuleSpecifier extends Base {
    original: any;

    alias: any;

    moduleDeclarationType: any;

    identifier: any;

    constructor(original?: any, alias?: any, moduleDeclarationType?: any);

    children: any;

    compileNode(o?: any): any;

}

export class ImportSpecifier extends ModuleSpecifier {
    constructor(imported?: any, local?: any);

    compileNode(o?: any): any;

}

export class ImportDefaultSpecifier extends ImportSpecifier {
}

export class ImportNamespaceSpecifier extends ImportSpecifier {
}

export class ExportSpecifier extends ModuleSpecifier {
    constructor(local?: any, exported?: any);

}

export class Assign extends Base {
    variable: any;

    value: any;

    context: any;

    constructor(variable?: any, value?: any, context?: any, options?: any);

    children: any;

    isStatement(o?: any): any;

    checkAssignability(o?: any, varBase?: any): any;

    assigns(name?: any): any;

    unfoldSoak(o?: any): any;

    compileNode(o?: any): any;

    compilePatternMatch(o?: any): any;

    compileConditional(o?: any): any;

    compileSpecialMath(o?: any): any;

    compileSplice(o?: any): any;

}

export class Code extends Base {
    isGenerator: any;

    bound: any;

    body: any;

    params: any;

    constructor(params?: any, body?: any, tag?: any);

    children: any;

    isStatement(): any;

    jumps(): any;

    makeScope(parentScope?: any): any;

    compileNode(o?: any): any;

    eachParamName(iterator?: any): any;

    traverseChildren(crossScope?: any, func?: any): any;

}

export class Param extends Base {
    name: any;

    value: any;

    splat: any;

    constructor(name?: any, value?: any, splat?: any);

    children: any;

    compileToFragments(o?: any): any;

    asReference(o?: any): any;

    isComplex(): any;

    eachName(iterator?: any, name?: any): any;

}

export class Splat extends Base {
    children: any;

    isAssignable(): any;

    name: any;

    constructor(name?: any);

    assigns(name?: any): any;

    compileNode(o?: any): any;

    unwrap(): any;

    static compileSplattedArray: any;

}

export class Expansion extends Base {
    isComplex(): any;

    compileNode(o?: any): any;

    asReference(o?: any): any;

    eachName(iterator?: any): any;

}

export class While extends Base {
    body: any;

    guard: any;

    condition: any;

    constructor(condition?: any, options?: any);

    children: any;

    isStatement(): any;

    makeReturn(res?: any): any;

    addBody(body?: any): any;

    jumps(): any;

    compileNode(o?: any): any;

}

export class Op extends Base {
    flip: any;

    second: any;

    first: any;

    operator: any;

    constructor(op?: any, first?: any, second?: any, flip?: any);

    children: any;

    isNumber(): any;

    isYield(): any;

    isUnary(): any;

    isComplex(): any;

    isChainable(): any;

    invert(): any;

    unfoldSoak(o?: any): any;

    generateDo(exp?: any): any;

    compileNode(o?: any): any;

    compileChain(o?: any): any;

    compileExistence(o?: any): any;

    compileUnary(o?: any): any;

    compileYield(o?: any): any;

    compilePower(o?: any): any;

    compileFloorDivision(o?: any): any;

    compileModulo(o?: any): any;

    toString(idt?: any): any;

}

export class In extends Base {
    object: any;

    array: any;

    constructor(object?: any, array?: any);

    children: any;

    invert(): any;

    compileNode(o?: any): any;

    compileOrTest(o?: any): any;

    compileLoopTest(o?: any): any;

    toString(idt?: any): any;

}

export class Try extends Base {
    attempt: any;

    errorVariable: any;

    recovery: any;

    ensure: any;

    constructor(attempt?: any, errorVariable?: any, recovery?: any, ensure?: any);

    children: any;

    isStatement(): any;

    jumps(o?: any): any;

    makeReturn(res?: any): any;

    compileNode(o?: any): any;

}

export class Throw extends Base {
    expression: any;

    constructor(expression?: any);

    children: any;

    isStatement(): any;

    jumps(): any;

    makeReturn(): any;

    compileNode(o?: any): any;

}

export class Existence extends Base {
    expression: any;

    constructor(expression?: any);

    children: any;

    invert(): any;

    compileNode(o?: any): any;

}

export class Parens extends Base {
    body: any;

    constructor(body?: any);

    children: any;

    unwrap(): any;

    isComplex(): any;

    compileNode(o?: any): any;

}

export class StringWithInterpolations extends Parens {
    compileNode(o?: any): any;

}

export class For extends While {
    returns: any;

    pattern: any;

    range: any;

    from: any;

    object: any;

    own: any;

    body: any;

    constructor(body?: any, source?: any);

    children: any;

    compileNode(o?: any): any;

    pluckDirectCall(o?: any, body?: any): any;

}

export class Switch extends Base {
    subject: any;

    cases: any;

    otherwise: any;

    constructor(subject?: any, cases?: any, otherwise?: any);

    children: any;

    isStatement(): any;

    jumps(o?: any): any;

    makeReturn(res?: any): any;

    compileNode(o?: any): any;

}

export class If extends Base {
    body: any;

    isChain: any;

    elseBody: any;

    condition: any;

    constructor(condition?: any, body?: any, options?: any);

    children: any;

    bodyNode(): any;

    elseBodyNode(): any;

    addElse(elseBody?: any): any;

    isStatement(o?: any): any;

    jumps(o?: any): any;

    compileNode(o?: any): any;

    makeReturn(res?: any): any;

    ensureBlock(node?: any): any;

    compileStatement(o?: any): any;

    compileExpression(o?: any): any;

    unfoldSoak(): any;

}


