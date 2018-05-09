console.log('index.js');
// $('.heb-main').text().replace(/\n|\r| /igm, '')
let hebContentDom = '';

$(() => {
    const $window = $(window);
    const $html = $('html');
    const $body = $('body');
    const winWidth = $body.width();

    $html.addClass('is-xa-today-print');

    @import './uploadBoxFn.js';
    const uploadBox = uploadBoxFn();

    const iframeSrc = isDev ? `http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm` : '';
    $body.append(`
        <div class="btn btn-primary add-mask">MASK</div>
        <iframe class="heb-bg-iframe" src="${iframeSrc}" frameborder="0"></iframe>
    `);

    $('.heb-bg-iframe').css({
        width: winWidth,
        'margin-left': -(winWidth / 2) + 'px',
    });

    $('.heb-pic').html(uploadBox);

    @import './upload.js';
    @import './mask.js';
});