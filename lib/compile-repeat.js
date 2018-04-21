'use strict';

// const getClass = require('../lib/get-class');


const compileRepeat = ($dom, $, repeat) => {

    let dom = $.trim($dom.prop('outerHTML'));
    // const domClass = getClass($dom);

    const $dataItems = $dom.find('[data-item]');

    const dataItemsLen = $dataItems.length;

    // const isUl = $dom.is('ul');

    const isDataItem = dataItemsLen > 0;

    const hasArticle = /<Article>/i.test(dom);

    const hasRepeat = /<Repeat(\s*)Begin=(\d*)(\s*)?End=(\d*)(\s*)?>/ig.test(dom);

    let size = dataItemsLen;
    if (isDataItem && repeat) {
        size = repeat;
    } else {
        repeat = size;
    }

    let tag = {
        // '<ul>': '',
        // '</ul>': '',
        '<Repeat>': '',
        '</Repeat>': '',
        '<Article>': `<Article>`,
        '</Article>': `</Article>`,
    };

    // if (isUl) {
    //     tag['<ul>'] = `<ul${domClass}>`;
    //     tag['</ul>'] = `</ul>`;
    // }

    if (repeat > 1) {
        tag['<Repeat>'] = `<Repeat Begin=0 End=${size}>`;
        tag['</Repeat>'] = `</Repeat>`;
    }

    // if (hasRepeat) {
    //     tag['<Repeat>'] = '';
    //     tag['</Repeat>'] = '';
    // }
    //
    // if (hasArticle) {
    //     tag['<Article>'] = '';
    //     tag['</Article>'] = '';
    // }

    if (isDataItem) {
        dom = $dataItems.eq(0).prop('outerHTML');
        dom = `
            ${tag['<Repeat>']}
                ${tag['<Article>']}
                    ${dom}
                ${tag['</Article>']}
            ${tag['</Repeat>']}
        `;
        dom = $dom.html(dom).prop('outerHTML');
        console.log('isDataItem dom: ', dom);
    }

    //
    // dom = `
    //     ${tag['<ul>']}
    //         ${tag['<Repeat>']}
    //             ${tag['<Article>']}
    //                 ${dom}
    //             ${tag['</Article>']}
    //         ${tag['</Repeat>']}
    //     ${tag['</ul>']}
    // `;

    const result = {
        repeat: repeat,
        dom: dom
    };

    return result;
}

module.exports = compileRepeat;
