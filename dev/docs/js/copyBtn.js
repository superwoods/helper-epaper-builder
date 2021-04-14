const copyBtn = () => {
    $body.append(`
        <div class="btn clear-btn hide" id="clear-btn">清除</div>
        <div class="btn clear-btn hide" id="load-btn">读取</div>
        <div class="btn copy-btn" id="finish-btn">完成</div>
        <div class="btn btn-primary copy-btn hide" id="copy-btn">下载</div>
    `);

    $('#clear-btn').on('click', () => {
        var mymessage = confirm("☠️\n \n即将清除页面内容和存储，\n请注意这个操作无法撤销！！\n点击确认开始清除。");
        if (mymessage == true) {
            dbObj.clear();
            window.location.reload();
        }
        $('#load-btn').hide();
    });

    $('#load-btn').on('click', () => {
        $('.openTips').show();
        dbObj.select(1);
    });
};

copyBtn();