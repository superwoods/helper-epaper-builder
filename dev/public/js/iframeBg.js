const iframeBg = () => {
    // if (isDev == false) {
    const winWidth = $body.width();
    const iframeSrc = `http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm`;
    $body.append(`<iframe class="heb-bg-iframe" src="${iframeSrc}" frameborder="0"></iframe>`);

    // set postion
    $('.heb-bg-iframe').css({
        width: winWidth,
        'margin-left': -(winWidth / 2) + 'px',
    });
    // }
};

iframeBg();