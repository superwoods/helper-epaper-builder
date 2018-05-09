const renderData = (data) => {
    console.log('ajax:', data);
    const files = data.files;
    const clearfix = '<span style="clear:both; width:100%; height:0; display:block;overflow:hidden"></span>';

    const filter = (src, imgIndex) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const className = `heb-img-${imgIndex}`;
            const $p = $(`.${className}`);
            let width = (img.naturalWidth * 951 / 1654);
            const height = img.naturalHeight * 1345 / 2339;

            if (width < 951) {
                width--;
                if (imgObj.hasOwnProperty(imgIndex - 1) === false) {
                    imgObj[imgIndex] = { left: true };
                    $p.css({
                        float: 'left',
                    });
                }
                else {
                    if (imgObj[imgIndex - 1].left === true) {
                        $p.css({
                            float: 'left',
                        });
                    }
                }
                $p.width(width).height(height);
            } else {
                $p.after(clearfix);
                $p.width(width);
            }

            console.log('imgObj:', imgObj);
        };
    };

    files.map((e, i) => {
        imgIndex++;
        const src = e.path.replace('public', '');
        const className = `heb-img-${imgIndex}`;
        filter(src, imgIndex);
        const dom = `
            <p class="${className}">
                <img src="${src}" width="100%" height="auto">
            </p>
        `;
        hebContentDom += dom;
        $('.upload-box').replaceWith(`
            ${dom}
            ${uploadBox}
        `);
    });
};
renderData(data);