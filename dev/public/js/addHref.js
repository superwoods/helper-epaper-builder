const addHref = () => {
    const copyBtnShow = () => {
        $('#copy-btn').show();
        $('#finish-btn').hide();
    };

    const copyBtnHide = () => {
        $('#copy-btn').hide();
        $('#finish-btn').show();
    };

    copyBtnHide();

    $('.add-href').each(function (i, e) {
        const $e = $(e);
        const $a = $e.find('a');
        const $text = $e.find('.add-href-text');
        let val = $text.val();
        const isHeader = $e.hasClass('heb-img-1-1') || $e.hasClass('heb-img-1');
        let heb1Val = 'http://www.xiongan.gov.cn/xiongan-today/?xats';

        if (isHeader == false) {
            heb1Val = '';
        }
        // $a.attr('href', heb1Val + val);

        $text.on('input', function () {
            const $this = $(this);
            val = $this.val();
            $a.attr('href', heb1Val + val);
            if ($this.hasClass('add-href-text2')) {
                $('.stage-i').text(val.replace('http://www.xiongan.gov.cn/xiongan-today/?xats', ''));
            }
            // localStorageSet();
            // setDownloadDom();
        });

        // console.log('isHeader:', isHeader);
        if (isHeader) {
            let stageI = $.trim($('.stage-i').text());
            console.log('stageI:', stageI);
            if (stageI == '-') {
                stageI = localStorage.getItem('hebSageI');
            } else {
                localStorage.setItem('hebSageI', stageI);
            }
            val = `${stageI || ''}`;
            $a.attr('href', heb1Val + val);
            $text.val(val);

            window.stageNum = val;

            // localStorageSet();
            // setDownloadDom();
        } else {
            $text.val($a.attr('href'));
        }
    });

    // // 防止读取本地数据后点击图片出现页面跳转
    // $('.add-href a').on('click', (e) => {
    //     e.preventDefault();
    // });

    $('#finish-btn').on('click', () => {
        // $('.add-href-btn').trigger('click');
        $('.add-href')
            .find('.add-href-input')
            .fadeOut(function () {
                $(this).remove();
            });

        // localStorageSet();
        setDownloadDom();
        copyBtnShow();

        $('#copy-btn').click(function () {
            const stage = $.trim($('.stage-i').text());
            alert('请将' + stage + '.html 放入图片文件夹，然后打开复制到发糕器！！');
            export_raw($.trim($('.stage-i').text()) + '.html', window.downloadDom);
        });

    });
};
