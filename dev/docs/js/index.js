// console.log('mod > index.js');
$(() => {
    const $html = $('html');
    const $body = $('body');
    const $hebPic = $('.heb-pic');


    @import './setAllHeight.js'
    @import './downDomClean.js'
    @import './setDownloadDom.js'

    @import './indexedBDSet.js'

    @import './addHref.js'
    @import './indexedDBFn.js'

    dbObj.init({
        dbName: 'HEB_project',
        dbVersion: '1.0',
        dbStoreName: 'data'
    });

    console.log(dbObj);

    @import './pageSizeConfig.js'
    @import './render-data.js'

    @import './upload.js'
    @import './mask.js'
    @import './title.js'

    // import './copyBtn.js'
    @import './copyBtn.js'

    @import './tips.js'
    @import './downloadFns.js'

    // import './localDataLoad.js'
    if (localStorage.getItem('heb-textarea-data') == 'show') {
        $('#textarea-data').removeClass('hide');
    } else {
        $('#textarea-data').addClass('hide');
    }

    $('.heb-textarea-onOff').on('click', function () {
        if ($('#textarea-data').hasClass('hide')) {
            $('#textarea-data').removeClass('hide');
            localStorage.setItem('heb-textarea-data', 'show');
        } else {
            $('#textarea-data').addClass('hide');
            localStorage.setItem('heb-textarea-data', 'hide');
        }
    });

    $('#finish-btn').hide();

});