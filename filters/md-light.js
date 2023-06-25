'use strict';

const replacements = [
    // *emphasis*
    {
        regex: /\*(.*?)\*/g,
        func: (match, p1) => {
            return `<span class="hl">${p1}</span>`
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
        regex: /(<\/\/>)/g,
        func: (match, p1, p2) => {
            return `<span class="divider">//</span>`
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
