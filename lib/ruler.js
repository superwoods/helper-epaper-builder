'use strict';
const cmsRules = require('../lib/cms-rules');
const rulerSingle = require('../lib/ruler-single');

const ruler = (str) => {
    cmsRules.forEach((value, index) => {
        str = rulerSingle(value, index, str);
    });
    return str;
}

module.exports = ruler;
