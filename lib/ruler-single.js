'use strict';

const checkType = require('../lib/check-type');
const isArray = (obj) => checkType('Array', obj);
const isString = (obj) => checkType('String', obj);

const rulerSingle = (value, index, str) => {
    const key = value.key || '';
    const code = value.code || '';
    let regexp = '';
    if (isArray(key)) {
        key.forEach((value, index, ar) => {
            regexp += '\{\{' + value + '\}\}' + ((index < key.length - 1) ? '|' : '');
        });
    } else if (isString(key)) {
        regexp += '\{\{' + key + '\}\}';
    } else {
        console.log('rulerSingle error key: ' + key);
        return;
    }
    regexp = new RegExp(regexp, 'gi');
    str = str.replace(regexp, code);
    return str;
}

module.exports = rulerSingle;
