const renderData = (data) => {
    console.log('ajax:', data);
    window.hebDom = '';

    const $hebPic = $('.heb-pic');
    const files = data.files;
    let finishTimer = data.length;
    let results = {};

    const filter = ({
        e,
        imgIndex,
    }) => {
        const originalname = e.originalname;
        const originalnameArray = originalname.split(/\.|-|_/);
        let index = originalnameArray[0];
        const isPrint = /p/ig.test(index);
        if (isPrint === false) {
            index -= 0;
        }
        const img = new Image();
        const className = `heb-img-${index}`;
        // const src = e.path.replace(/public(\/|\\)/ig, window.location.href);
        const src = e.path.replace(/public(\\|\/)/ig, window.location.href).replace(/\\/ig, '/');

        console.log('filter: ', originalnameArray, index, src);

        img.src = src;
        img.onload = () => {
            const result = {
                hasChild: false,
                className: className,
                originalname: originalname,
                width: Math.round(img.naturalWidth * pageWidth / naturalWidth),
                height: Math.round(img.naturalHeight * pageHeight / naturalHeight),
                src: src,
                mainName: index,
            };

            const isChild = originalnameArray.length >= 3;

            console.log('isNoChild:', isChild);

            if (isChild === false) {
                results[index] = result;
            } else {
                if (results.hasOwnProperty(index) === false) {
                    results[index] = {};
                }
                const childIndex = originalnameArray[1] - 0;
                result.className += '-' + childIndex;
                results[index][childIndex] = result;
            }
            finishTimer--;
        };
    };

    console.log('files: ', files);

    files.map((e, i) => {
        imgIndex++;
        filter({ e, imgIndex });
    });

    const renderDom = ($target, results) => {

        console.log('renderDom results:', results);


        let dom = '';
        let domPrint = '';
        for (let prop in results) {
            const e = results[prop];

            console.log(prop, e);

            const hasChild = e.hasChild;
            if (hasChild === false) {
                const isPrint = /p/ig.test(e.mainName);
                if (isPrint) {
                    domPrint += `    <li><a href="${e.src}" target="_blank" title="${e.src}"><img width="100%" src="${e.src}"></a>${e.originalname}</li>\n`;
                    dom += `<p align="center" class="heb-hide ${e.className} only-print">\n    <img src="${e.src}" width="100%" height="auto" align="center">\n</p>\n\n`;
                } else {
                    dom += `<p class="add-href ${e.className}">\n    <img src="${e.src}" width="100%" height="auto">\n</p>\n\n`;
                }
            } else {
                dom += `<div class="heb-box-div" style="width:${pageWidth}px !important;max-width:${pageWidth}px !important;height:${pageHeight}px !important;position:relative;">\n`;

                let { left, top } = {
                    left: 0,
                    top: 0,
                };

                for (let porp2 in results[prop]) {

                    const e2 = results[prop][porp2];

                    dom += `    <p class="add-href ${e2.className}" style="width:${e2.width}px !important;max-width:${e2.width}px !important;height:${e2.height}px !important;left:${left}px;top:${top}px;position:absolute;">\n         <img src="${e2.src}" width="100%" height="auto">\n     </p>\n`;

                    // 拼接定位 StART / 不支持3列
                    const isFullHeight = e2.height >= (pageHeight - top);
                    if (left == 0) {
                        if (isFullHeight) {
                            left += e2.width;
                            top = 0;
                        } else {
                            left = 0;
                            top += e2.height;
                        }
                    } else {
                        top += e2.height;
                    }
                    // 拼接定位 END
                }
                dom += '</div>\n\n';
            }
        }
        if (dom) {
            // 写入 dom
            dom = $.trim(dom);
            window.hebDom += dom;
            $target.append(dom);
            addHref();

            if (domPrint) {
                $('.heb-alert-tips').remove();
                $('.heb-print-tips').append(domPrint);
            } else {
                const tips = '本次上传似乎缺少打印图，发布后的页面可能会无法正常打印！！！';
                $target.before(`<div class="heb-alert-tips">${tips}</div>`);
                // alert(tips);
            }
        }
    };

    let setint = setInterval(() => {
        if (finishTimer === 0) {
            renderDom($('.heb-pic'), results);
            clearInterval(setint);
            setint = null;
        }
    }, 1);
};

