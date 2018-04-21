'use strict';

const styleHtml = require('html');

const addComments = (obj) => {
    let html = obj.html;
    // body写入编译结果汇总信息
    const comments = (text) => `
    \n
    <!-- helper${obj.type ? '-' + obj.type : ''} {{${obj.name ? 'name:' + obj.name + ', ': ''}${obj.length ? 'mods:' + obj.length + ', ': ''}date:${obj.time}}} ${text ? text : ''} -->
    \n
    `;
    const begin = comments('BEGIN');
    const end = comments('END');

    const regexpBody = /<body(.*)?>/igm;
    const regexpBodyEnd = /<\/body>/igm;

    const hasBody = regexpBody.test(html) && regexpBodyEnd.test(html);
    const hasDOCTYPE = /<!DOCTYPE html>/i.test(html);
    const isHtml = /^<html/i.test(html);
    // console.log('hasDOCTYPE: ', hasDOCTYPE);
    // console.log('isHtml: ', isHtml);
    if (!hasDOCTYPE && isHtml) {
        html = `<!DOCTYPE html>${html}`;
    }

    if (hasBody) {
        html = html.replace(regexpBody, `<body$1>${begin}`)
            .replace(regexpBodyEnd, `${end}</body>`);
    } else {
        html = `${begin}${html}${end}`;
    }

    // html = styleHtml.prettyPrint(html);

    return html;
}

module.exports = addComments;
