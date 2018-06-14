const renderData = (data) => {
    console.log('renderData ajax cb:', data);
    // window.hebDom = '';
    const $hebPic = $('.heb-pic');
    const files = data.files;
    let finishTimer = data.length;
    let renderItems = {};
    const blank = '    ';

    const herfInput = (on) => {
        return `<span class="add-href-input ${on ? 'add-href-input2' : ''}">${on ? '<span class="add-href-base">http://www.xiongan.gov.cn/xiongan-today/?xats</span>' : ''}<input class="btn add-href-text ${on ? 'add-href-text2' : ''}" value="#" placeholder="请输入链接" type="text"><span class="add-href-btn"></span></span>`;
    };

    const filter = (e) => {
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
        filter(e);
    });

    const dom_isPrint = (src, className) => (`\n${blank}<img src="${src}" width="100%" height="auto" align="center" class="${className}">`);
    // herfInput

    const dom_is_p_a_img = (src, className) => {

        console.log('dom_is_p_a_img:', /heb-img-1/ig.test(className));

        let on = false;
        if ('heb-img-1' == className || 'heb-img-1-1' == className) {
            on = true;
        }
        return `\n<p class="add-href ${className}">\n${blank}<a href="#" target="_blank">\n${blank}${blank}<img src="${src}" width="100%" height="auto">\n${blank}</a>${herfInput(on)}\n</p>`;
    };

    const renderDom = (renderItems) => {
        // console.log('renderDom renderItems:', renderItems);
        let dom = '';
        let domPrint = '';
        let domShowPrintImgs = '';

        for (let prop in renderItems) {
            const e = renderItems[prop];
            // regPicName.push(e)
            console.log(prop, e);

            const hasChild = e.hasChild;
            if (hasChild === false) {
                const isPrint = /p/ig.test(e.mainName);
                if (isPrint) {
                    console.log('e.src:', e.src);

                    domShowPrintImgs += `\n<li><a href="${e.src}" target="_blank" title="${e.src}">\n<img width="100%" src="${e.src}">\n</a>${e.originalname}</li>`;
                    if (domPrint == '') {
                        domPrint = `\n<p align="center" class="heb-hide">`;
                    }
                    domPrint += dom_isPrint(e.src, e.className);

                } else {
                    dom += dom_is_p_a_img(e.src, e.className);
                }
            } else {
                dom += `\n<div style="width:${pageWidth}px !important;height:${pageHeight}px !important;position:relative;">`;

                let { left, top } = {
                    left: 0,
                    top: 0,
                };

                for (let porp2 in renderItems[prop]) {
                    const e2 = renderItems[prop][porp2];
                    console.log('e2.src:', e2.src);

                    let on = false;
                    if ('heb-img-1' == e2.className || 'heb-img-1-1' == e2.className) {
                        on = true;
                    }

                    dom += `\n${blank}<p class="add-href ${e2.className}" style="width:${e2.width}px !important;height:${e2.height}px !important;left:${left}px;top:${top}px;position: absolute;">\n${blank}${blank}<a href="#" target="_blank">\n${blank}${blank}${blank}<img src="${e2.src}" width="100%" height="auto">\n${blank}${blank}</a>\n${herfInput(on)}\n${blank}</p>`;

                    // 拼接定位 START / 注意！不支持3列 2018-06-13
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
                dom += '\n</div>';
            }
        }

        if (dom) {
            // 写入 dom
            domPrint = $.trim(domPrint);
            dom = $.trim(dom);
            dom = `${dom}\n${domPrint ? `${domPrint}\n</p>` : ''}`;

            // window.hebDom = dom;
            $hebPic.html(dom);
            localStorageSet();

            addHref();

            if (domShowPrintImgs) {
                $('.heb-alert-tips').remove();
                $('.heb-print-tips').append(domShowPrintImgs);
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

