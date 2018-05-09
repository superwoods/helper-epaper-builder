const mask = () => {
    const $addMask = $('.add-mask');
    $addMask.on('click', (e) => {
        const $html = $('html');
        const className = 'is-mask';
        const classNameBtnActive = 'btn-primary';
        const isMask = $html.hasClass(className);
        const $e = $(e.currentTarget);
        if (isMask === true) {
            $html.removeClass(className);
            $e.addClass(classNameBtnActive);
            $e.text('突出');
        } else {
            $html.addClass(className);
            $e.removeClass(classNameBtnActive);
            $e.text('预览');
        }
    });
    $addMask.trigger('click');
};
mask();