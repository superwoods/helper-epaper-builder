'use strict';

const checkType = (type, obj) => Object.prototype.toString.call(obj) === `[object ${type}]`;

module.exports = checkType;
