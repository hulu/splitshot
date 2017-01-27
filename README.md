# @hulu/splitshot
A NodeJS module that generates rough TypeScript declarations from CoffeeScript sources

# Installation
To run it from the command line:

```bash
$ npm install -g @hulu/splitshot
```

or to run it from JavaScript:

```
$ npm install --save @hulu/splitshot
```

# Usage
## CLI
The `splitshot` CLI command accepts the path to a `.coffee` file as its only argument and prints (to `stdout`) the TypeScript declaration for the provided `.coffee` file.  You'll likely want to redirect `stdout` to a file like so:

```bash
$ splitshot path/to/SingleOrigin.coffee > path/to/SingleOrigin.d.ts
```

## From JavaScript
```javascript
const splitshot = require("@hulu/splitshot");
const fs = require("fs");

const pathToCoffee = "path/to/SingleOrigin.coffee";

fs.readFile(pathToCoffee, (err, data) => {
  if (err) { throw err };
  const declarations = splitshot.generateDeclarations(data, pathToCoffee);

  // do stuff with those declarations!
});
```

## Optional adjustments to `tsconfig.json`
By default, TypeScript only looks for `.d.ts` files next to the file being required, e.g.

```typescript
import foo = require("./foo");
```

results in a path search for `./foo.d.ts` or `./foo.ts` at compile-time.  This makes integration with CoffeeScript sources initially very simple: just put the `.d.ts` files next to the corresponding `.coffee` file.  This quickly gets very messy -- especially for large CoffeeScript projects.  To keep the generated `.d.ts` files in a separate directory, use the [rootDirs compiler option](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to add an additional types source:

```javascript
{
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "target": "es3",
        "outDir": "bin/typescript/",
        // check ./src and ./bin/types/src for type declarations
        "rootDirs": [
            "./src",
            "./bin/types/src/"
        ]
    },
    "include": [
        "core/**/*.ts"
    ]
}
```

Just be sure to mirror the directory structure in `./src` so the lookup paths match!  `@hulu/gulp-splitshot` (coming soon) handles directory structure matching, so consider using it for projects that build with `gulp`.
