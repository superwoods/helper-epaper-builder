/**
 * @Author: SuperMoo <SuperWoods>
 * @Date:   2017-03-14-08:53:14
 * @Email:  st_sister@me.com
 * @Filename: index.js
 * @Last modified by:   SuperWoods
 * @Last modified time: 2017-04-14-18:15:51
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */
$(() => {
    const $submit = $('#submit');
    const $htmlInput = $('#html-input');
    const $label = $('.err label');
    const $replaceSrc = $('#replace-src');

    function checkFileType(event) {
        let val = $htmlInput.val();
        if (/\.html|\.htm|\.xml/.test(val)) {
            $label.html('选择文件');
            // $replaceSrc.focus();
            return true;
        } else {
            let oops = '';
            if (val === null || val === undefined || val === '') {
                oops = '<span class="oops">Oops!</span> <span class="text">并不支持上传空气!</span> 🤔';
            } else {
                if (/\.avi|\.mkv|\.mp4/.test(val)) {
                    oops = `<span class="oops">呐呐呐！</span> 👸 <span class="text">不可以上传这种文件哦！</span>💋`;
                } else {
                    oops = `<span class="oops">Oops!</span> <span class="text">${val ? '\'' + val + '\' ' : '未知'}类型不支持上传呦! </span> 🙅`;
                }
            }
            $label.html(oops);
            event && event.preventDefault();
            return false;
        }
    }

    $('#replace-src-label').append(`
        <span class="btn btn-sm" data-src="http://www.newsres.cn/">css, js</span>
        <span class="btn btn-sm" data-src="http://www.newsimg.cn/">img</span>
        <span class="btn btn-sm" data-src="http://www.newsstat.cn/">rar, pdf</span>
    `);

    $('#replace-src-label .btn').on('click', function () {
        $replaceSrc.val($(this).data('src'));
    });

    $htmlInput.on('change', function () {
        // $submit.click();
        checkFileType();

    });

    $submit.on('click', function (event) {
        checkFileType(event);
    });

    $('#jump-helper-tool').on('mouseover', function () {
        const $donkeyData = $('#donkey-data');
        const data = $donkeyData.val();
        const isCMSdata = !/#/.test(data);
        // console.log('isCMSdata', isCMSdata);
        if (isCMSdata) {
            $(this).attr('href', 'https://xinhuaradiolab.github.io/helper/tool/#' + data);
        } else {
            $(this).attr('href', 'https://xinhuaradiolab.github.io/helper/tool/');
        }
    });
});
