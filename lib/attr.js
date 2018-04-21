'use strict';

const attrHandler = (attr) => {
    if (attr.indexOf('默认') !== -1) {
        attr = 'null';
        attr = attr.replace(new RegExp('默认', 'g'), '');
    } else {
        attr = attr
            .replace(/图片|61/, '+61')
            .replace(/头条|62/, '+62')
            .replace(/普通|63/, '+63');
        attr = attr
            .replace(new RegExp('图片', 'g'), '')
            .replace(new RegExp('头条', 'g'), '')
            .replace(new RegExp('普通', 'g'), '');
    }
    return attr;
}

module.exports = attrHandler;
