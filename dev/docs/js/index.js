// console.log('mod > index.js');
$(() => {
    let setAllHeight_settimeout;

    function setAllHeight(filesNum) {
        clearTimeout(setAllHeight_settimeout);
        setAllHeight_settimeout = null;
        setAllHeight_settimeout = setTimeout(() => {
            console.log('filesNum:', filesNum);

            if (filesNum == undefined) {
                filesNum = $('#heb-picDomTarget').find('img').length;
            }

            let h = $('#heb-picDomTarget').outerHeight();
            h += (filesNum >= 5 ? 2000 : 1000);
            $('.heb-box-in').height(h);
            $('.heb-box').height(h + 400);
        }, 400);
    }

    @import './downDomClean.js'
    @import './setDownloadDom.js'
    @import './localStorageSet.js'
    @import './addHref.js'
    @import './indexedDBFn.js'

    dbObj.init({
        dbName: 'HEB_project',
        dbVersion: '1.0',
        dbStoreName: 'data'
    });

    console.log(dbObj);




    const $html = $('html');
    const $body = $('body');
    const $hebPic = $('.heb-pic');

    $html.addClass('is-xa-today-print');



    // if (isDev) {
    //     $html.addClass('is-dev');
    // }


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