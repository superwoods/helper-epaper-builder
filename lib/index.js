'use strict';

const fs = require("fs");
const jsdom = require('jsdom');
const jQuery = require("jquery");
const dateFormat = require('dateformat');

const compiler = require('../lib/compiler');

const decompiler = require('../lib/decompile/decompiler');
const isWebbot = require('../lib/decompile/is-webbot');

const donkey = require('../lib/donkey/donkey');
const isDonkey = require('../lib/donkey/is-donkey');
const catchData = require('../lib/donkey/catch-data');

module.exports = (obj) => {
    const res = obj.res;
    const file = obj.file;
    const replaceSrc = obj.replaceSrc;
    const donkeyData = obj.donkeyData;
    const fileOriginalName = obj.fileOriginalName;

    global.HELP_CMS.uploadOrgFileType = null;

    fs.readFile(file.path, 'utf-8', function (err, callbackData) {
        if (err) {
            console.error('/lib/index.js readFile err:\n', err);
            return;
        }

        // console.log('callbackData: ', callbackData);

        const now = new Date();
        const time = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

        let str = callbackData;

        // DEBUG：去除 bom， 否则会影响后续逻辑嵌套，导致 html body嵌套错误
        const regexpBom = /\ufeff|&#65279/ig;
        const hasBom = regexpBom.test(str);
        console.log('hasBom: ', hasBom);
        if (hasBom) {
            str = str.replace(regexpBom, '');
        }

        jsdom.env(
            str,
            (err, window) => {
                if (err) {
                    console.error('jsdom err:\n', err);
                    return;
                }
                const $ = jQuery(window);

                // console.log('html: ', $('html').html());
                // console.log('head: ', $('head').html());
                // console.log('body: ', $('body').html());


                const _isWebbot = isWebbot(str);
                const _isDonkey = isDonkey(str);



                let obj = {
                    'res': res,
                    'file': file,
                    'str': str,
                    '$': $,
                    'time': time,
                    'fileOriginalName': fileOriginalName,
                    'debug': window
                    // 'is': {
                    //     'donkey': _isDonkey,
                    //     'webbot': _isWebbot,
                    // },
                }

                // if (_isWebbot) {
                if (_isDonkey) {
                    obj['donkeyData'] = catchData(donkeyData);
                    // console.log(' obj[\'donkeyData\'] =========================');
                    // console.log(obj['donkeyData']);
                    // console.log('====================================');
                    donkey(obj);
                    return;
                } else {
                    decompiler(obj);
                    return;
                }
                // } else {
                //     obj['replaceSrc'] = replaceSrc;
                //     compiler(obj);
                // }
            }
        );
    });
};
