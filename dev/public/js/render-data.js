const renderData = (data) => {
    console.log('renderData:', data);

    // window.hebDom = '';

    const $hebPic = $('.heb-pic');

    const files = data.files;
    window.finishTimer = files.length;
    let renderItems = {};

    const blank = '    ';

    const herfInput = (on) => {
        return `<span class="add-href-input ${on ? 'add-href-input2' : ''}">${on ? '<span class="add-href-base">http://www.xiongan.gov.cn/xiongan-today/?xats</span>' : ''}<input class="btn add-href-text ${on ? 'add-href-text2' : ''}" value="#" placeholder="请输入链接" type="text"><span class="add-href-btn"></span></span>`;
    };

    const filter = (e) => {
        const originalname = e.name; //e.originalname;

        if (originalname) {
            // console.log('originalname:', originalname);
            const originalnameArray = originalname.split(/\.|-|_/);
            // console.log('name:', originalnameArray, originalname);

            let imgName = originalnameArray[0];

            const isPrint = /p/ig.test(imgName);

            if (isPrint == false) {
                imgName -= 0;
            }

            const className = `heb-img-${imgName}`;
            // const src = e.path.replace(/public(\/|\\)/ig, window.location.href);

            var reader = new FileReader();//这是核心,读取操作就是由它完成.
            //reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL

            var image = new Image();

            reader.addEventListener("load", function (event) {
                // $('.heb-pic').append(`<img src="${event.target.result}" class="${imgName}">`);
                // $('.' + imgName).attr('src', event.target.result);
                // const src = event.target.result; //e.path.replace(/public/ig, '').replace(/\\/ig, '/');
                // console.log('filter: ', originalnameArray, imgName);

                image.src = event.target.result;

                image.onload = () => {
                    const renderItem = {
                        hasChild: false,
                        className: className,
                        originalname: originalname,
                        width: Math.round(image.naturalWidth * pageWidth / naturalWidth),
                        height: Math.round(image.naturalHeight * pageHeight / naturalHeight),
                        src: e.name,
                        srcData: event.target.result,
                        mainName: imgName,
                    };

                    const isChild = originalnameArray.length >= 3;

                    console.log('isChild:', isChild);

                    if (isChild == false) {
                        renderItems[imgName] = renderItem;
                    } else {
                        if (renderItems.hasOwnProperty(imgName) === false) {
                            renderItems[imgName] = {};
                        }
                        const childIndex = originalnameArray[1] - 0;
                        renderItem.className += '-' + childIndex;
                        renderItems[imgName][childIndex] = renderItem;
                    }

                    finishTimer--;

                    console.log('111', finishTimer);
                };

            }, false);


            reader.readAsDataURL(e);

        }
    };

    // console.log('files: ', files);

    // files.map((e, i) => {
    //     imgIndex++;
    //     filter(e);
    // });

    for (const key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
            const e = files[key];
            imgIndex++;
            console.log('1:', imgIndex);
            filter(e);
        }
    }

    const dom_isPrint = (src, className, e) => {
        // if (e) { // 页面显示的 dom
        return `\n${blank}<img src="${e.srcData}" data-src="${src}" width="100%" height="auto" align="center" class="${className}">`;
        // } else {
        //     return `\n${blank}<img  width="100%" height="auto" align="center" class="${className}">`;
        // }
    };

    const dom_is_p_a_img = (src, className, e) => {
        // console.log('dom_is_p_a_img:', /heb-img-1/ig.test(className));
        let on = false;
        if ('heb-img-1' == className || 'heb-img-1-1' == className) {
            on = true;
        }
        // if (e) { // 页面显示的 dom
        return `\n<p class="add-href ${className}">\n${blank}<a href="#" target="_blank">\n${blank}${blank}<img src="${e.srcData}" data-src="${src}" width="100%" height="auto">\n${blank}</a>${herfInput(on)}\n</p>`;
        // } else {
        //     return `\n<p class="${className}">\n${blank}<a href="#" target="_blank">\n${blank}${blank}<img src="${src}" width="100%" height="auto">\n${blank}</a>\n</p>`;
        // }
    };

    const renderDom = (renderItems) => {
        console.log('---///--> renderDom:', renderItems);


        let dom = '';
        let domForDownload = '';
        let domPrint = '';
        let domPrintForDownload = '';
        let domShowPrintImgs = '';
        // let domShowPrintImgsForDownload = '';

        for (let prop in renderItems) {
            const e = renderItems[prop];
            // regPicName.push(e)
            console.log(prop, e);

            const hasChild = e.hasChild;


            if (hasChild == false) {
                const isPrint = /p/ig.test(e.originalname);
                if (isPrint) {
                    // console.log('e.src:', e.src);

                    domShowPrintImgs += `\n<li><a href="${e.src}" target="_blank" title="${e.src}">\n<img width="100%" src="${e.srcData}">\n</a>${e.originalname}</li>`;

                    if (domPrint == '') {
                        domPrint = `\n<p align="center" class="heb-hide">`;
                        // domPrintForDownload = `\n<p align="center" class="heb-hide">`;
                    }
                    domPrint += dom_isPrint(e.src, e.className, e);
                    // domPrintForDownload += dom_isPrint(e.src, e.className);

                } else {
                    dom += dom_is_p_a_img(e.src, e.className, e);
                    // domForDownload += dom_is_p_a_img(e.src, e.className);
                }
            } else {
                // const div1 = `\n<div style="width:${pageWidth}px !important;height:${pageHeight}px !important;position:relative;">`;
                dom += `\n<div style="width:${pageWidth}px !important;height:${pageHeight}px !important;position:relative;">`;
                // domForDownload += div1;

                let { left, top } = {
                    left: 0,
                    top: 0,
                };

                for (let porp2 in renderItems[prop]) {
                    const e2 = renderItems[prop][porp2];
                    // console.log('e2.src:', e2.src);

                    let on = false;
                    if ('heb-img-1' == e2.className || 'heb-img-1-1' == e2.className) {
                        on = true;
                    }

                    // const div2 = (imgSrc, isHerfInput) => (`\n${blank}<p class="add-href ${e2.className}" style="width:${e2.width}px !important;height:${e2.height}px !important;left:${left}px;top:${top}px;position: absolute;">\n${blank}${blank}<a href="#" target="_blank">\n${blank}${blank}${blank}<img src="${imgSrc}" width="100%" height="auto">\n${blank}${blank}</a>\n${isHerfInput ? herfInput(on) : ''}\n${blank}</p>`);

                    dom += `\n${blank}<p class="add-href ${e2.className}" style="width:${e2.width}px !important;height:${e2.height}px !important;left:${left}px;top:${top}px;position: absolute;">\n${blank}${blank}<a href="#" target="_blank">\n${blank}${blank}${blank}<img src="${e2.srcData}" data-src="${e2.src}" width="100%" height="auto">\n${blank}${blank}</a>\n${herfInput(on)}\n${blank}</p>`;

                    // domForDownload += div2(e2.src, false);

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
                // const div3 = '\n</div>';
                dom += '\n</div>';
                // domForDownload += div3;
            }
        }

        if (dom) {
            // 写入 dom
            domPrint = $.trim(domPrint);
            dom = $.trim(dom);
            dom = `${dom}\n${domPrint ? `${domPrint}\n</p>` : ''}`;

            // domPrintForDownload = $.trim(domPrintForDownload);
            // domForDownload = $.trim(domForDownload);
            // domForDownload = `${domForDownload}\n${domPrintForDownload ? `${domPrintForDownload}\n</p>` : ''}`;

            // window.hebDom = dom;

            // console.log('dom:', dom);

            $hebPic.html(dom);

            setDownloadDom();

            // console.log('domForDownload:', domForDownload);
            // localStorageSet();
            // $('#textarea-data').text(domForDownload);

            addHref();

            if (domShowPrintImgs) {
                $('.heb-alert-tips').remove();
                $('.heb-print-tips').append(domShowPrintImgs);
            } else {
                const tips = 'Oops :( 本次上传似乎缺少打印图，发布后的页面可能无法正常打印！！！';
                $hebPic.before(`<div class="heb-alert-tips">${tips}</div>`);
                // alert(tips);
            }
        }
    };


    console.log(finishTimer, renderItems);

    // // 异步上传队列，上传计数，循环验证是否为全部上传完成，之后生成页面
    // let setint = setInterval(() => {
    //     if (window.finishTimer <= 0) {
    //         clearInterval(setint);
    //         setint = null;

    //         renderDom(renderItems);
    //     }
    // }, 1);

    renderDom(renderItems);

    // renderDom(renderItems);
};

