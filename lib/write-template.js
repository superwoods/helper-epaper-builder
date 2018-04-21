'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');

const result = require('../pages/result');

const bom = require('../lib/bom');

// 创建目录
const mkdir = (dist) => {
    mkdirp(dist, function(err) {
        if (err) {
            console.error('mkdirp err:', err);
            return;
        }
    });
}

const writeTemplate = (obj) => {
    mkdir(`${global.HELP_CMS.download}/`);
    fs.writeFile(obj.dist, bom + obj.html, 'utf-8', function(err) {
        if (err) {
            console.error('writeTemplate err:', err);
            return;
        };
        obj.res.send(result(obj));
        console.log('\nwriteTemplate: \n', obj.html);
    });
}

module.exports = writeTemplate;
