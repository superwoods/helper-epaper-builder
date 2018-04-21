'use strict';

const regexpDonkeyTV = require('../../lib/donkey/regexp-donkey-template-variable');
// const regexpWebbot = require('../../lib/decompile/regexp-webbot');
const isDonkey = (html) => regexpDonkeyTV.test(html)
// {
    // let _isDonkey = false;
    // html.replace(regexpWebbot, function(...opt){
    // });
    // return _isDonkey;
// }

module.exports = isDonkey;
