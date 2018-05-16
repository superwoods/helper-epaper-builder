const addHref = () => {
    const copyBtnShow = () => {
        $('#copy-btn').show();
        $('#finish-btn').hide();
    };

    const copyBtnHide = () => {
        $('#copy-btn').hide();
        $('#finish-btn').show();
    };

    const herfInput = (value) => (`
    <div class="add-href-input">
        <input class="btn add-href-text" value="${value ? value : ''}" placeholder="请输入链接" type="text">
        <div class="add-href-btn"></div>
    </div>`);

    const addA = ({
        $addHref,
        val
    }) => {
        $addHref
            .find('img')
            .wrap(`<a href="${val || '#'}" target="_blank"></a>`);

        const $a = $addHref.find('a');
        $a.on('click', function (e) {
            e.preventDefault();
        });
    };

    const addHrfBtn = ({
        $addHref,
        hasA,
        $img,
    }) => {
        const $addHrefInput = $addHref.find('.add-href-input');
        const $btn = $addHrefInput.find('.add-href-btn');
        $btn.on('click', function () {
            if (hasA === false) {
                const $text = $addHrefInput.find('.add-href-text');
                const val = $text.val();
                addA({
                    $addHref,
                    val
                });
            }
            $addHrefInput.fadeOut(function () {
                $(this).remove();
                copyBtnShow();
            });
        });
    };

    const onChange = ({
        $addHref,
    }) => {
        const $text = $addHref.find('.add-href-text');
        $text.on('input', function () {
            const $this = $(this);
            const val = $this.val();
            const $a = $addHref.find('a');
            const hasA = $a.length > 0;
            if (hasA === false) {
                addA({
                    $addHref,
                    val
                });
            } else {
                $a.attr('href', val);
            }
            $a.on('click', function (e) {
                e.preventDefault();
            });
        });
    };

    $('.add-href').on('click', function () {
        copyBtnHide();

        const $this = $(this);
        const $img = $this.find('img');

        const $a = $this.find('a');
        const $addHrefInput = $this.find('.add-href-input');
        const hasA = $a.length > 0;
        const hasInput = $addHrefInput.length > 0;

        console.log('hasA', hasA, $a.length);

        if (hasInput === false) {
            let _herfInput = herfInput();
            const isHeader = $this.hasClass('heb-img-1-1') || $this.hasClass('heb-img-1');

            console.log('isHeader:', isHeader);

            if (isHeader) {
                const stageI = $.trim($('.stage-i').text());
                _herfInput = herfInput(`http://www.xiongan.gov.cn/xiongan-today/?xats${stageI || ''}`);
            }
            if (hasA) {
                const href = $a.attr('href');
                _herfInput = herfInput(href);
            }
            $this.append(_herfInput);
        }

        addHrfBtn({
            $addHref: $this,
            hasA,
            $img,
        });

        onChange({
            $addHref: $this,
        });
    });


    $('#finish-btn').on('click', () => {
        copyBtnShow();
        $('.add-href-btn').trigger('click');
    });
};
