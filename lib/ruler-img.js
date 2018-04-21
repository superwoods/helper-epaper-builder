'use strict';
const cmsRulesImg = require('../lib/cms-rules-img');
const checkType = require('../lib/check-type');
const isArray = (obj) => checkType('Array', obj);

function replacement(...options) {
    let replacementCode = cmsRulesImg[1].code;

    if (options[0].indexOf('图片地址') !== -1 || options[0].indexOf('pic-src') !== -1 || options[0].indexOf('tpdz') !== -1) {
        return cmsRulesImg[0].code;;
    }

    if (options[3] && options[3] === '*') {
        let key = 'needcode=5';
        let replacement = key +
            ((options[2]) ? ` width=${options[2]}` : '') +
            ((options[4]) ? ` height=${options[4]}` : '');
        return replacementCode.replace(key, replacement);
    }

    return replacementCode;
}

const rulerImg = (str) => {
    cmsRulesImg.forEach((value, index) => {
        const type = value.type || '';
        const key = value.key || '';
        const code = value.code || '';
        if (type === '图片' || type === '图片地址') {
            if (isArray(key)) {
                key.forEach((value, index, ar) => {
                    const regexp = new RegExp(`{{${value}(,\\s*?(\\d*|auto)(\\*)(\\d*|auto)\\s*?)?}}`, 'gi');
                    // console.log('regexp:', regexp);
                    str = str.replace(regexp, replacement);
                });
            } else {
                console.log('rulerImg error key: ' + key);
                return;
            }
        }
    });
    return str;
}

module.exports = rulerImg;
