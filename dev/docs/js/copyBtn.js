const copyBtn = () => {
    $body.append(`
        <div class="btn clear-btn" id="clear-btn">清除</div>
        <div class="btn copy-btn" id="finish-btn">完成</div>
        <div class="btn btn-primary copy-btn hide" id="copy-btn">下载</div>
    `);

    $('#clear-btn').on('click', () => {
        var mymessage = confirm("☠️\n \n即将清除页面内容，\n请注意这个操作无法撤销！！\n点击确认开始清除。");
        if (mymessage == true) {
            dbObj.clear();
            window.location.reload();
        }
        // else if (mymessage == false) {
        //     // document.write("要学javascript，而且必须学");
        // }
    });
};

copyBtn();