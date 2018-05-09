const uploadBoxFn = () => {
    return `
        <div class="upload-box">
            <form action="/upload-multi" method="post" enctype="multipart/form-data" id="form-upload-multi">
                <input class="btn" type="file" name="pic" multiple="multiple">
                <input class="btn btn-primary" type="button" value="上传文件" id="form-submit">
            </form>
        </div>
    `;
};
window.uploadBox = uploadBoxFn();
$('.heb-pic').html(uploadBox);
