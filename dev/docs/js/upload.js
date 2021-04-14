$('#form-submit').on('click', function () {
    const files = document.getElementById('fileId').files;

    renderData({
        files,
    });

    if ($('.loading').hasClass('hide')) {
        $('.loading').removeClass('hide');
    }
});
