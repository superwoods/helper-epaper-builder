const uploadTxt = () => {
    const formData = new FormData($('#form-upload-txt')[0]);
    $.ajax({
        url: '/upload-txt',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            // <div class="btn btn-primary copy-btn hide" id="copy-btn">下载</div>
            console.log('uploadTxt success data:', data);
            if (data.hasData == 1) {
                $('#copy-btn').off('click');
                $('#copy-btn')
                    .html(`<a href="${data.path}" target="_blank">下载</a>`)
                    .find('a')
                    .click();
            } else {
                $('.upload-box').append(`
                    <span class="tips">连接不到服务器，请检查网络！</span>
                `);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.upload-box').append(`
                <span class="tips">连接不到服务器，请检查网络！</span>
            `);
        }
    });
};
