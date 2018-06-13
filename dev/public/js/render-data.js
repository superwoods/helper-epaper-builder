const renderData = (data) => {
    console.log('ajax:', data);
    window.hebDom = '';

    const $hebPic = $('.heb-pic');
    const files = data.files;
    let finishTimer = data.length;
    let renderItems = {};

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
        const src = e.path.replace(/public/ig, '').replace(/\\/ig, '/');

        console.log('filter: ', originalnameArray, index, src);

        img.src = src;
        img.onload = () => {
            const renderItem = {
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
                renderItems[index] = renderItem;
            } else {
                if (renderItems.hasOwnProperty(index) === false) {
                    renderItems[index] = {};
                }
                const childIndex = originalnameArray[1] - 0;
                renderItem.className += '-' + childIndex;
                renderItems[index][childIndex] = renderItem;
            }
            finishTimer--;
        };
    };

    // console.log('files: ', files);

    files.map((e, i) => {
        imgIndex++;
        filter({ e, imgIndex });
    });

    const dom_isPrint = (src, className) => (`<p align="center" class="heb-hide ${className}">\n    <img src="${src}" width="100%" height="auto" align="center">\n</p>\n\n`);

    const dom_isNotPrint = (src, className) => (`<p class="add-href ${className}">\n    <img src="${src}" width="100%" height="auto">\n</p>\n\n`);


    const renderDom = (renderItems) => {
        // console.log('renderDom renderItems:', renderItems);
        let dom = '';
        let domPrint = '';
        let regPicName = [];


        for (let prop in renderItems) {
            const e = renderItems[prop];
            // regPicName.push(e)
            console.log(prop, e);

            const hasChild = e.hasChild;
            if (hasChild === false) {
                const isPrint = /p/ig.test(e.mainName);
                if (isPrint) {
                    console.log('e.src:', e.src);

                    domPrint += `    <li><a href="${e.src}" target="_blank" title="${e.src}"><img width="100%" src="${e.src}"></a>${e.originalname}</li>\n`;

                    dom += dom_isPrint(e.src, e.className);

                } else {
                    dom += dom_isNotPrint(e.src, e.className);
                }
            } else {
                dom += `<div style="width:${pageWidth}px;height:${pageHeight}px;position:relative;">\n`;

                let { left, top } = {
                    left: 0,
                    top: 0,
                };

                for (let porp2 in renderItems[prop]) {

                    const e2 = renderItems[prop][porp2];

                    console.log('e2.src:', e2.src);


                    dom += `    <p class="add-href ${e2.className}" style="width:${e2.width}px;height:${e2.height}px;left:${left}px;top:${top}px;position: absolute;">\n         <img src="${e2.src}" width="100%" height="auto">\n     </p>\n`;

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

            // 生成下载页面

            window.hebDom = dom;
            $hebPic.html(dom);
            localStorageSet();
            addHref();

            if (domPrint) {
                $('.heb-alert-tips').remove();
                $('.heb-print-tips').append(domPrint);
            } else {
                const tips = '本次上传似乎缺少打印图，发布后的页面可能无法正常打印！！！';
                $hebPic.before(`<div class="heb-alert-tips">${tips}</div>`);
                // alert(tips);
            }
        }
    };

    // 异步上传队列，上传计数，循环验证是否为全部上传完成，之后生成页面
    let setint = setInterval(() => {
        if (finishTimer === 0) {
            renderDom(renderItems);
            clearInterval(setint);
            setint = null;
        }
    }, 1);
};

