'use strict';

const regexpWebbot = require('../../lib/decompile/regexp-webbot');

const isWebbot = (html) => regexpWebbot.test(html);

module.exports = isWebbot;
