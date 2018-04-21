'use strict';
const addComments = require('../lib/add-comments');
const compileItem = require('../lib/compile-item');
const writeTemplate = require('../lib/write-template');
const compileSrc = require('../lib/compile-src');
const jQuery = require("jquery");

const compiler = (obj) => {
    let debug = obj.debug;

    let res = obj.res;
    let file = obj.file;
    let replaceSrc = obj.replaceSrc;
    let $ = obj.$;
    let time = obj.time;
    let str = obj.str;


    const $html = $('html');
    const $body = $('body');

    // console.log();

    // console.log(jQuery(debug));
    // console.log(jQuery(debug)('html').html(), $html.html());
    // console.log(jQuery(debug)('body').html(), $body.html());


    // 编译结果
    let total = {
        list: []
    };

    // 编译 data-helper 块
    $body.find('[data-helper]').each(function(i, e) {
        let dataHelp = $(e).data('helper');

        console.log('dataHelp:', dataHelp);

        // 处理参数
        if (dataHelp) {
            // 切割参数数组
            if (/,/.test(dataHelp)) {
                dataHelp = dataHelp.split(',');
            } else {
                dataHelp = [dataHelp, null, 0]
            }
            // 去空
            dataHelp[0] = $.trim(dataHelp[0]); // 信息片
            dataHelp[1] = $.trim(dataHelp[1]); // 属性
            dataHelp[2] = $.trim(dataHelp[2]) - 0; // repeat
        } else {
            dataHelp = null;
        }
        const item = compileItem($(e), dataHelp, i, $);
        total.list.push(item);
    });

    let html = $('html').prop('outerHTML');
    const compileSrcObj = compileSrc(html, replaceSrc);
    html = compileSrcObj.html;
    html = addComments({
        'type': 'compile',
        'length': total.list.length,
        'time': time,
        'html': html,
        'name': file.originalname
    });

    file = file.path
        .replace(`${global.HELP_CMS.upload}/org`, `${global.HELP_CMS.download}/cms`)
        .replace('.html', '.htm');

    const result = {
        isDecompile: false,
        html: html,
        dist: file,
        time: time,
        total: total,
        res: res,
        replaceSrc: replaceSrc,
        compileSrcObj: compileSrcObj,
    };

    writeTemplate(result);
}

module.exports = compiler;
