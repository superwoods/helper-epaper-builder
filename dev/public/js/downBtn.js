const copyBtn = () => {
    $body.append(`
        <div class="btn copy-btn" id="finish-btn">完成</div>
        <div class="btn btn-primary copy-btn hide" id="copy-btn">下载</div>
    `);

    $('#copy-btn').on('click', () => {
        let dom = localStorageSet();
        dom = downDomClean(dom);

        console.log('downDomClean:', dom);




    });
};

copyBtn();