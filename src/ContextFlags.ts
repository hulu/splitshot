export enum ContextFlags {
    None = 0,
    /** Set when parsing within a class */
    InClass = 1 << 0,
    /**
     * Set when module.exports is assigned to another variable, e.g.
     * `Foo = module.exports`
     */
    ExportAlias = 1 << 1,
    /**
     * Set when some variable overwrites module.exports, e.g.
     * `module.exports = Bar`
     */
    ExportOverwrite = 1 << 2,
}
