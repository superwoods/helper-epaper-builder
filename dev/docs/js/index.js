// console.log('mod > index.js');
$(() => {
    // window.hebContentDom = '';
    // window.imgIndex = 0;
    // window.isDev = false;

    // const $window = $(window);
    const $html = $('html');
    const $body = $('body');
    const $hebPic = $('.heb-pic');

    $html.addClass('is-xa-today-print');

    // if (isDev) {
    //     $html.addClass('is-dev');
    // }

    @import './downDomClean.js'
    @import './setDownloadDom.js'

    @import './pageSizeConfig.js'
    @import './render-data.js'

    // import './uploadBoxFn.js'

    //import './iframeBg.js'
    @import './upload.js'
    @import './mask.js'
    @import './title.js'

    // import './copyBtn.js'
    @import './copyBtn.js'

    @import './tips.js'
    @import './addHref.js'

    // local
    @import './uploadTxt.js'
    // import './localDataLoad.js'

    // $('#textarea-data').on('input', () => {
    //     localStorageSet();
    // });

    $('.heb-textarea-onOff').on('click', function () {
        if ($('#textarea-data').hasClass('hide')) {
            $('#textarea-data').removeClass('hide');
        } else {
            $('#textarea-data').addClass('hide');
        }
    });
});