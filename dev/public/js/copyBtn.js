const copyBtn = () => {
    $body.append(`
        <div class="btn clear-btn" id="clear-btn">清除</div>
        <div class="btn copy-btn" id="finish-btn">完成</div>
        <div class="btn btn-primary copy-btn hide" id="copy-btn">下载</div>
    `);

    $('#copy-btn').on('click', () => {
        uploadTxt();
    });

    $('#clear-btn').on('click', () => {
        localStorage.clear();
    });
};

copyBtn();