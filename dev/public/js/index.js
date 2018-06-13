// console.log('mod > index.js');
$(() => {
    window.hebContentDom = '';
    window.imgIndex = 0;

    // const $window = $(window);
    const $html = $('html');
    const $body = $('body');
    const $hebPic = $('.heb-pic');

    $html.addClass('is-xa-today-print');

    @import './localStorageSet.js'

    @import './pageSizeConfig.js'
    @import './render-data.js'
    @import './uploadBoxFn.js'
    @import './iframeBg.js'
    @import './upload.js'
    @import './mask.js'
    @import './title.js'

    // import './copyBtn.js'
    @import './downBtn.js'
    @import './downDomClean.js'

    @import './tips.js'
    @import './addHref.js'

    // local
    @import './localDataLoad.js'

});