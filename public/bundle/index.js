'use strict';

console.log('index.js');
// $('.heb-main').text().replace(/\n|\r| /igm, '')
$(function () {
    var $body = $('body');

    // let iframeSrc = isDev ? `http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm`;

    $body.append('\n        <iframe class="heb-bg-iframe" src="http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm" frameborder="0"></iframe>\n    ');
});