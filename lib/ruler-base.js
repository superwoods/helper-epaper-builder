'use strict';

const cmsBase = {
    'URL_BEGIN': '<Url>',
    'URL_END': '</Url> ',
    'lt': '&lt;',
    'gt': '&gt; ',
    'enpquot': '#enpquot#',
};

const rulerBase = (dom) => {
    if (dom) {
        dom = dom
                .replace(/URL_BEGIN/g, cmsBase.URL_BEGIN)
                .replace(/URL_END/g, cmsBase.URL_END)
                .replace(/</g, cmsBase.lt)
                .replace(/>/g, cmsBase.gt)
                .replace(/"/g, cmsBase.enpquot);
        return dom;
    } else {
        console.error('rulerBase: ', dom);
    }
}

module.exports = rulerBase;
