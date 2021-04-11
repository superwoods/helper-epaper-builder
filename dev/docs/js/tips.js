const tips = (text) => {
    $('.heb-tips')
        .html(text)
        .show()
        .delay(2000)
        .fadeOut(function () {
            $(this).hide().stop();
        });
};