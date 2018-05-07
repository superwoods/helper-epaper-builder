console.log('index.js');
// $('.heb-main').text().replace(/\n|\r| /igm, '')
$(() => {
    const $body = $('body');

    // let iframeSrc = isDev ? `http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm`;

    $body.append(`
        <iframe class="heb-bg-iframe" src="http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm" frameborder="0"></iframe>
    `);


});