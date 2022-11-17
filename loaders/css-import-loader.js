'use strict';

const fs = require('fs/promises');
const path = require('path');
const os = require('os');

async function handleFile(state, file, content) {
    if (state.options.verbose) console.log('Checking', file, 'for @import...');

    const dir = path.dirname(file);
    if (!content) content = await fs.readFile(file, 'utf8');

    // only supports `@import string;` format
    const importRegex = /@import ["']?([^\s"';]*)["']?;\r?\n/gm;

    while (true) {
        const lastIndex = importRegex.lastIndex;
        const result = importRegex.exec(content);

        // no matches -> done
        if (!result) break;

        // match -> try resolving
        const line = result[0];
        const target = result[1];
        const targetPath = await new Promise((resolve => {
            // using webpack's resolve adds files to dependencies (for reload)
            state.resolve(dir, target, (err, result) => resolve(result));
        }));
        if (state.options.verbose) console.log(file, 'imports', targetPath);

        // file not found -> move on, keep searching
        try {
            await fs.access(targetPath);
        } catch (error) {
            continue;
        }

        // remove import statement
        content = content.replace(line, '');
        importRegex.lastIndex = lastIndex;

        // if not added already, add to file list
        if (!state.allFiles.includes(targetPath)) {
            state.newFiles.push(targetPath);
            state.allFiles.push(targetPath);
        }
    }

    // store cleaned-up content
    state.contents.push(content);
}

async function loader(source) {
    const state = {
        resourcePath: this.resourcePath,
        resolve: this.resolve,
        options: this.getOptions(),
        newFiles: [],
        allFiles: [this.resourcePath],
        contents: []
    }

    await handleFile(state, state.resourcePath, source);
    while (state.newFiles.length > 0) {
        await handleFile(state, state.newFiles.shift());
    }
    return state.contents.join(os.EOL);
}

module.exports = loader;
