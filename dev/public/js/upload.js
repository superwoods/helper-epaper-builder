const upload = (e) => {
    const formData = new FormData($('#form-upload-multi')[0]);

    console.log('formData: ', formData);

    $.ajax({
        url: '/upload-multi',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            renderData(data);
            if (data.length) {
                $('.upload-box').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.upload-box').append(`
                <span class="tips">连接不到服务器，请检查网络！</span>
            `);
        }
    });
};

$('#form-submit').on('click', upload);
