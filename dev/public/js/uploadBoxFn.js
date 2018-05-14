const uploadBoxFn = () => {
    return `
        <div class="upload-box">
            <form action="/upload-multi" method="post" enctype="multipart/form-data" id="form-upload-multi">
                <input class="btn" type="file" name="pic" multiple="multiple">
                <input class="btn btn-primary" type="button" value="上传文件" id="form-submit">
            </form>
        </div>
        <div class="heb-main-tips">
            <h2>上传说明：</h2>
            <ul>
                <li>必须使用数字文件名作为图片序列 <code>1.jpg, 2.jpg, 3.jpg...</code> </li>
                <li>必须使用 <code>p</code> 标记打印图 <code>p1.jpg, p2.jpg, p3.jpg...</code></li>
                <li>使用分隔符 <code>_</code> 开启拼图布局 (先上下后左右) <code>1_1.jpg, 1_2.jpg...</code></li>
            </ul>
            <a href="https://github.com/xinhuaRadioLAB/helper-epaper-builder-doc/issues/1" target="_blank">了解更多或反馈问题</a>
        </div>
    `;
};
window.uploadBox = uploadBoxFn();

// 写入 uploadBox
$('.heb-pic').after(uploadBox);
