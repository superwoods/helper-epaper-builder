const upload = () => {
    var formData = new FormData($('#form-upload-multi')[0]);
    $.ajax({
        url: '/upload-multi',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            @import './render-data.js';

            $('#form-submit').on('click', upload);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.upload-box').append(`
                <span class="tips">连接不到服务器，请检查网络！</span>
            `);
        }
    });
};

$('#form-submit').on('click', upload);
