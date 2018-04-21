'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const archiver = require('archiver');

const result = require('../../pages/result');
const bom = require('../../lib/bom');
const addComments = require('../../lib/add-comments');

const donkey = (obj) => {
    mkdirp(`${global.HELP_CMS.download}/`);

    let res = obj.res;
    let file = obj.file;
    let donkeyData = obj.donkeyData;
    let $ = obj.$;
    let time = obj.time;
    let str = obj.str;
    let index = 0;
    const $html = $('html');
    // donkey template
    let template = $html.prop('outerHTML');
    if ($html.length) {
        template = str;
    }

    // set zipPath
    let zipPath = file.path.replace(`${global.HELP_CMS.upload}/org`, `${global.HELP_CMS.download}/zip`);
    zipPath = zipPath.replace(/\.html$|\.htm$/igm, '.zip');
    let output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
        zlib: {
            level: 9
        } // Sets the compression level.
    });
    // listen for all archive data to be written
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        throw err;
    });

    //将打包对象与输出流关联
    archive.pipe(output);

    for (let prop in donkeyData) {
        let html = template;

        console.log('donkeyData[prop]: ', prop, donkeyData.hasOwnProperty(prop));


        if (donkeyData[prop]) {


            // if(donkeyData[prop].hasOwnProperty('list')) {
            const list = donkeyData[prop].list;
            if (list) {
                // 编译模版的索引
                index++;
                for (let _prop in list) {
                    let regProp = new RegExp(`{{${_prop}}}`, 'ig');
                    let nid = list[_prop].nid;
                    html = html.replace(regProp, `${nid}`);
                }
                html = addComments({
                    'type': `donkey`,
                    'length': list.length,
                    'time': time,
                    'html': html,
                    'name': prop,
                });
                //将被打包文件的流添加进archiver对象中
                archive.append(bom + html, {
                    'name': `${(index < 10) ? '0' + index : index}-${prop}.htm`
                });
            }
            // }
        }
    }

    //打包
    archive.finalize();
    const donkeyResult = {
        type: 'donkey',
        dist: zipPath,
        time: time,
        donkey: {
            index: index,
        }
    };
    obj.res.send(result(donkeyResult));
}

module.exports = donkey;
