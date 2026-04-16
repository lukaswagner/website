'use strict';

/** @param {string} str */
function clean(str) {
    return str.toLowerCase().replace(/\W/g, '')
}

const replacements = [
    // *emphasis*
    {
        regex: /\*(.*?)\*/g,
        func: (match, p1) => {
            return `<span class="hl">${p1}</span>`
        }
    },
    // local #[links](links)
    {
        regex: /\#\[(.*?)\](?:\((.*?)\))?/g,
        func: (match, p1, p2) => {
            return `<a class="nbr" href="#${clean(p2??p1)}">${p1}</a>`
        }
    },
    // [links](links)
    {
        regex: /\[(.*?)\]\((.*?)\)/g,
        func: (match, p1, p2) => {
            return `<a class="nbr" href="${p2}">${p1}</a>`
        }
    },
    // divider <//>
    {
        regex: /\s*<\/\/>\s*/g,
        func: () => {
            return `<span class="divider comment">//</span>`
        }
    },
    // lists
    {
        regex: /\s*- (.*?)$/gm,
        func: (match, p1) => {
            return `<li>${p1}</li>`
        }
    },
    // newlines denoted by two spaces
    {
        regex: /  $/gm,
        func: () => {
            return `<br>`
        }
    },
    // double newline for new paragraph
    {
        regex: /\r?\n\r?\n/gm,
        func: () => {
            return `<br><br>`
        }
    },
]

function filter(source) {
    for (const r of replacements) {
        source = source.replace(r.regex, r.func);
    }
    return source;
}

module.exports = filter;
