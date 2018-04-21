'use strict';

const catchAttr = require('../lib/decompile/catch-attr');

const regexpScript = /<script([\s\S]*?)><\/script>/igm;
const regexpLink = /<link([\s\S]*?)[\/]?>/igm;
const regexpImg = /<img([\s\S]*?)[\/]?>/igm;

const keys = {
    href: 'href',
    src: 'src',
};
const endSlash = /\/$/gm;
const beginSlash = /^\//gm;
const jqSrc = 'http://www.xinhuanet.com/global/lib/jq/jquery1.12.4/jquery1.12.4.js';

const compileSrc = (html, src) => {
    let index = 0;
    let list = [];

    if (src) {
        const fileHasEndSlash = endSlash.test(src);
        if (!fileHasEndSlash) {
            src += '/';
        }


        function replacement(...opt) {
            let reslut = opt[0];
            let opt1 = opt[1];
            if (opt1) {
                opt1 = opt1.trim();
            }
            const attrs = catchAttr(opt1, keys);
            let replacementSrc = jqSrc;
            for (var prop in attrs) {
                let value = attrs[prop];
                const valueHasBeginSlash = beginSlash.test(value);
                if (valueHasBeginSlash) {
                    value = value.replace(beginSlash, '');
                }
                if (value.indexOf('jq.js') === -1) {
                    replacementSrc = src + value;
                }
                const reg = new RegExp(`${prop}="([\\\s\\\S]*?)"`, 'im');
                const isReplaceSrc = reg.test(opt[0]);
                // console.log(isReplaceSrc);
                if (isReplaceSrc) {
                    reslut = opt[0].replace(reg, function() {
                        return ` ${prop}="${replacementSrc}"`
                    });
                    index++;
                    list.push({
                        index: index,
                        prop: prop,
                        value: value,
                        replacementSrc: replacementSrc,
                    });
                }
            }
            // console.log('replacementSrc: ', index, reslut);
            return reslut;
        }


        html = html.replace(regexpScript, replacement);
        html = html.replace(regexpLink, replacement);
        html = html.replace(regexpImg, replacement);
    }


    return {
        html: html,
        index: index,
        list: list,
    };
}

module.exports = compileSrc;
