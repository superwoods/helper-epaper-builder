'use strict';

const cmsRules = require('../../lib/cms-rules');

let regexpBase = [];
for (var i = 0; i < cmsRules.length; i++) {
    const reg = cmsRules[i].reg;
    const key = cmsRules[i].key[0];
    if (reg) {
        regexpBase.push({
            reg: reg,
            key: key,
            regexp: new RegExp(`<${reg}(.*)?>(\\\s*|\\\S*)?${reg}Ph(\\\s*|\\\S*)?<\\\/${reg}>`, 'igm')
        });
    }
}

module.exports = regexpBase;
