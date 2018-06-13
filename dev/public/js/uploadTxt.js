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

            console.log('uploadTxt success data:', data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.upload-box').append(`
                <span class="tips">连接不到服务器，请检查网络！</span>
            `);
        }
    });
};
