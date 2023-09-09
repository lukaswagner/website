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
        func: (match, p1, p2) => {
            return `<span class="divider">//</span>`
        }
    },
    // newlines denoted by two spaces
    {
        regex: /  $/gm,
        func: (match, p1, p2) => {
            return `<br>`
        }
    },
    // double newline for new paragraph
    {
        regex: /\r?\n\r?\n/gm,
        func: (match, p1, p2) => {
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
