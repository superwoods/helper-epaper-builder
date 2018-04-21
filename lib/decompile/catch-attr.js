'use strict';

const catchAttr = (attrsString, keys) => {
    let obj = {};
    for (let prop in keys) {
        const reg = new RegExp(`${prop}="([\\\s\\\S]*?)"`, 'im');
        attrsString.replace(reg, function(...opt) {
            const opt1 = opt[1];
            if (opt1) {
                obj[prop] = opt1.trim();
            } else {
                obj[prop] = null;
            }
        });
    }

    console.log('obj: ', obj);

    return obj;
}

module.exports = catchAttr;
