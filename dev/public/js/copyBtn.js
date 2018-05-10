const copyBtn = () => {
    $body.append(`
        <div class="btn btn-primary copy-btn" id="copy-btn">复制</div>
    `);

    const clipboard = new ClipboardJS($('#copy-btn')[0], {
        text: function (trigger) {
            // console.log('trigger: ', trigger);
            return window.hebDom;
        }
    });

    $('#copy-btn').on('click', () => {
        clipboard.on('success', function (e) {
            console.log('success: ', e);
            if (e.action === 'copy') {
                tips('已复制，Ctrl+V 粘贴');
            }
        });

        clipboard.on('error', function (e) {
            console.log('error: ', e);
        });
    });

    // 解决首次加载需点击两次复制按钮才能完成复制的问题
    $('#copy-btn').trigger('click');
};

copyBtn();