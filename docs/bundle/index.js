'use strict';

// console.log('mod > index.js');
$(function () {
    // window.hebContentDom = '';
    // window.imgIndex = 0;
    // window.isDev = false;

    // const $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $hebPic = $('.heb-pic');

    $html.addClass('is-xa-today-print');

    // if (isDev) {
    //     $html.addClass('is-dev');
    // }

    var downDomClean = function downDomClean(dom) {
        var r = dom
        // .replace(/\/upload\/pic\-\d*\-([\s\S]*?)/gi, '$1')
        .replace(/<span class="add-href-input[\s\S]*?<\/span>?[\s\S]*?<\/span>(<\/span>)?/gim, '');
        return r;
    };
    var setDownloadDom = function setDownloadDom() {
        // console.log('mod > localStorageSet.js');
        var forShowDom = $('#heb-picDomTarget').html();

        $('.heb-picHideDom').html(forShowDom).find('img').each(function (i, e) {
            // console.log(e, i);
            $(e).attr('src', $(e).attr('data-src'));
        });

        var downloadDom = $('.heb-picHideDom').html();

        if (downloadDom) {

            // localStorage.setItem('hebLocalData', forShowDom);

            downloadDom = downDomClean(downloadDom);
            console.log('downDomClean downdom:\n\n', downloadDom);
            $('#textarea-data').text(downloadDom);
        }

        window.downloadDom = downloadDom;
    };

    var _pageWidth$pageHeight = {
        pageWidth: 951,
        pageHeight: 1345,
        naturalWidth: 1654,
        naturalHeight: 2339
    },
        pageWidth = _pageWidth$pageHeight.pageWidth,
        pageHeight = _pageWidth$pageHeight.pageHeight,
        naturalWidth = _pageWidth$pageHeight.naturalWidth,
        naturalHeight = _pageWidth$pageHeight.naturalHeight;

    var renderData = function renderData(data) {
        console.log('renderData:', data);
        var filesNum = 0;
        // window.hebDom = '';

        var $hebPic = $('.heb-pic');

        var files = data.files;
        window.finishTimer = files.length;
        var renderItems = {};

        var blank = '    ';

        var herfInput = function herfInput(on) {
            return '<span class="add-href-input ' + (on ? 'add-href-input2' : '') + '">' + (on ? '<span class="add-href-base">http://www.xiongan.gov.cn/xiongan-today/?xats</span>' : '') + '<input class="btn add-href-text ' + (on ? 'add-href-text2' : '') + '" value="#" placeholder="\u8BF7\u8F93\u5165\u94FE\u63A5" type="text"><span class="add-href-btn"></span></span>';
        };

        var filter = function filter(e) {
            var originalname = e.name; //e.originalname;

            if (originalname) {
                // console.log('originalname:', originalname);
                var originalnameArray = originalname.split(/\.|-|_/);
                // console.log('name:', originalnameArray, originalname);

                var imgName = originalnameArray[0];

                var isPrint = /p[0-9][0-9]*/ig.test(imgName);

                if (isPrint == false) {
                    imgName -= 0;
                }

                var className = 'heb-img-' + imgName;
                // const src = e.path.replace(/public(\/|\\)/ig, window.location.href);

                var reader = new FileReader(); //这是核心,读取操作就是由它完成.
                //reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL

                var image = new Image();

                reader.addEventListener("load", function (event) {
                    // $('.heb-pic').append(`<img src="${event.target.result}" class="${imgName}">`);
                    // $('.' + imgName).attr('src', event.target.result);
                    // const src = event.target.result; //e.path.replace(/public/ig, '').replace(/\\/ig, '/');
                    // console.log('filter: ', originalnameArray, imgName);

                    image.src = event.target.result;

                    var picName = originalname.split('.')[0];

                    image.onload = function () {
                        var renderItem = {
                            hasChild: false,
                            className: className,
                            originalname: picName,
                            width: Math.round(image.naturalWidth * pageWidth / naturalWidth),
                            height: Math.round(image.naturalHeight * pageHeight / naturalHeight),
                            src: e.name,
                            srcData: event.target.result,
                            mainName: imgName
                        };

                        var isChild = originalnameArray.length >= 3;

                        console.log('isChild:', isChild);

                        if (isChild == false) {
                            renderItems[imgName] = renderItem;
                        } else {
                            if (renderItems.hasOwnProperty(imgName) === false) {
                                renderItems[imgName] = {};
                            }
                            var childIndex = originalnameArray[1] - 0;
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

        console.log('files: ', files);

        for (var key in files) {
            if (Object.hasOwnProperty.call(files, key)) {
                var e = files[key];
                if (/\.jpg|\.jpeg|\.png|\.gif/ig.test(e.name) && /标题图|标题图方/ig.test(e.name) == false) {
                    console.log(e.name);
                    filesNum++;
                    filter(e);
                }
            }
        }

        var dom_isPrint = function dom_isPrint(src, className, e) {
            // if (e) { // 页面显示的 dom
            return '\n' + blank + '<img src="' + e.srcData + '" data-src="' + src + '" width="100%" height="auto" align="center" class="' + className + '">';
            // } else {
            //     return `\n${blank}<img  width="100%" height="auto" align="center" class="${className}">`;
            // }
        };

        var dom_is_p_a_img = function dom_is_p_a_img(src, className, e) {
            // console.log('dom_is_p_a_img:', /heb-img-1/ig.test(className));
            var on = false;
            if ('heb-img-1' == className || 'heb-img-1-1' == className) {
                on = true;
            }
            // if (e) { // 页面显示的 dom
            return '\n<p class="add-href ' + className + '">\n' + blank + '<a href="#" target="_blank">\n' + blank + blank + '<img src="' + e.srcData + '" data-src="' + src + '" width="100%" height="auto">\n' + blank + '</a>' + herfInput(on) + '\n</p>';
            // } else {
            //     return `\n<p class="${className}">\n${blank}<a href="#" target="_blank">\n${blank}${blank}<img src="${src}" width="100%" height="auto">\n${blank}</a>\n</p>`;
            // }
        };

        var renderDom = function renderDom(renderItems) {
            console.log('---///--> renderDom:', renderItems);

            var dom = '';
            var domPrint = '';
            var domShowPrintImgs = '';

            // let domForDownload = '';
            // let domPrintForDownload = '';
            // let domShowPrintImgsForDownload = '';

            for (var prop in renderItems) {

                var _e = renderItems[prop];
                // regPicName.push(e)
                console.log('      ---> renderDom for:', prop, _e);

                var hasChild = _e.hasChild;

                // console.log('hasChild:', hasChild);


                if (hasChild == false) {
                    var isPrint = /p[0-9][0-9]*/ig.test(_e.originalname);

                    console.log('(hasChild == false) isPrint:', isPrint);

                    if (isPrint) {
                        // console.log('e.src:', e.src);

                        // domShowPrintImgs += `\n<li><a href="${e.src}" target="_blank" title="${e.src}">\n<img width="100%" src="${e.srcData}">\n</a>${e.originalname}</li>`;
                        domShowPrintImgs += '\n<li>\n<img width="100%" src="' + _e.srcData + '">\n' + _e.originalname + '</li>';

                        if (domPrint == '') {
                            domPrint = '\n<p align="center" class="heb-hide">';
                            // domPrintForDownload = `\n<p align="center" class="heb-hide">`;
                        }
                        domPrint += dom_isPrint(_e.src, _e.className, _e);
                        // domPrintForDownload += dom_isPrint(e.src, e.className);
                    } else {
                        console.log('isPrint == false', _e.src, _e.className, _e);

                        dom += dom_is_p_a_img(_e.src, _e.className, _e);
                        // domForDownload += dom_is_p_a_img(e.src, e.className);
                    }
                } else {
                    // const div1 = `\n<div style="width:${pageWidth}px !important;height:${pageHeight}px !important;position:relative;">`;
                    dom += '\n<div style="width:' + pageWidth + 'px !important;height:' + pageHeight + 'px !important;position:relative;">';
                    // domForDownload += div1;

                    var _left$top = {
                        left: 0,
                        top: 0
                    },
                        left = _left$top.left,
                        top = _left$top.top;


                    for (var porp2 in renderItems[prop]) {
                        var e2 = renderItems[prop][porp2];
                        // console.log('e2.src:', e2.src);

                        var on = false;
                        if ('heb-img-1' == e2.className || 'heb-img-1-1' == e2.className) {
                            on = true;
                        }

                        // const div2 = (imgSrc, isHerfInput) => (`\n${blank}<p class="add-href ${e2.className}" style="width:${e2.width}px !important;height:${e2.height}px !important;left:${left}px;top:${top}px;position: absolute;">\n${blank}${blank}<a href="#" target="_blank">\n${blank}${blank}${blank}<img src="${imgSrc}" width="100%" height="auto">\n${blank}${blank}</a>\n${isHerfInput ? herfInput(on) : ''}\n${blank}</p>`);

                        dom += '\n' + blank + '<p class="add-href ' + e2.className + '" style="width:' + e2.width + 'px !important;height:' + e2.height + 'px !important;left:' + left + 'px;top:' + top + 'px;position: absolute;">\n' + blank + blank + '<a href="#" target="_blank">\n' + blank + blank + blank + '<img src="' + e2.srcData + '" data-src="' + e2.src + '" width="100%" height="auto">\n' + blank + blank + '</a>\n' + herfInput(on) + '\n' + blank + '</p>';

                        // domForDownload += div2(e2.src, false);

                        // 拼接定位 START / 注意！不支持3列 2018-06-13
                        var isFullHeight = e2.height >= pageHeight - top;
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
                dom = dom + '\n' + (domPrint ? domPrint + '\n</p>' : '');

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
                    var _tips = 'Oops :( 本次上传似乎缺少打印图，发布后的页面可能无法正常打印！！！';
                    $hebPic.before('<div class="heb-alert-tips">' + _tips + '</div>');
                    // alert(tips);
                }

                $('.loading').addClass('hide');

                setTimeout(function () {
                    console.log('filesNum:', filesNum);
                    var h = $('#heb-picDomTarget').outerHeight();
                    h += filesNum >= 5 ? 2000 : 1000;
                    $('.heb-box-in').height(h);
                    $('.heb-box').height(h + 400);
                }, 400);
            }
        };

        // console.log(finishTimer, renderItems);

        // 异步上传队列，上传计数，循环验证是否为全部上传完成，之后生成页面
        var setintRuns = 0;

        var setint = setInterval(function () {
            console.log('setintRuns:', setintRuns, finishTimer, renderItems);

            setintRuns++;

            if (setintRuns >= 500) {
                clearInterval(setint);
                setint = null;
                renderDom(renderItems);
            }

            if (window.finishTimer == 0) {
                clearInterval(setint);
                setint = null;
                console.log('sss');
                renderDom(renderItems);
            }
        }, 1);

        // renderDom(renderItems);
    };

    // import './uploadBoxFn.js'

    //import './iframeBg.js'
    $('#form-submit').on('click', function () {
        var files = document.getElementById('fileId').files;
        renderData({
            files: files
        });

        if ($('.loading').hasClass('hide')) {
            $('.loading').removeClass('hide');
        }
    });

    var mask = function mask() {
        $body.append('<div class="btn add-mask">\u7A81\u51FA</div>'); //btn-primary 
        var $addMask = $('.add-mask');
        $addMask.on('click', function (e) {
            var $html = $('html');
            var className = 'is-mask';
            // const classNameBtnActive = 'btn-primary';
            var isMask = $html.hasClass(className);
            var $e = $(e.currentTarget);
            if (isMask === true) {
                $html.removeClass(className);
                // $e.addClass(classNameBtnActive);
                $e.text('突出');
            } else {
                $html.addClass(className);
                // $e.removeClass(classNameBtnActive);
                $e.text('预览');
            }
        });
        $addMask.trigger('click');
    };
    mask();
    var titleFn = function titleFn() {
        // console.log('mod > title.js');
        var heb1Val = 'http://www.xiongan.gov.cn/xiongan-today/?xats';

        var myDate = new Date();

        var _title$year$month$day = {
            title: '《今日雄安》',
            year: myDate.getFullYear(),
            month: myDate.getMonth() + 1,
            day: myDate.getDate() + 1,
            stage: '-'
        },
            title = _title$year$month$day.title,
            year = _title$year$month$day.year,
            month = _title$year$month$day.month,
            day = _title$year$month$day.day,
            stage = _title$year$month$day.stage;


        $('.title-box').html('\n        <div class="title">' + title + '</div>\n        <div class="year">\n            <div contenteditable="true" class="i year-i">' + year + '</div>\u5E74\n        </div>\n        <div class="month">\n            <div contenteditable="true" class="i month-i">' + month + '</div>\u6708\n        </div>\n        <div class="day">\n            <div contenteditable="true" class="i day-i">' + day + '</div>\u65E5\n        </div>\n        <div class="stage">\u7B2C<div contenteditable="true" class="i stage-i">' + stage + '</div>\u671F\n        </div>\n        <div class="i add-title" contenteditable="true"></div>\n    ');

        // $.ajax({
        //     url: 'http://www.xiongan.gov.cn/bundle/xat-data.js',
        //     dataType: "script",
        //     success() {
        //         const len = xatData.length;
        //         const last = xatData[len - 1];
        //         // console.log('mod > titleFn() data', last);
        //         last.Title.replace(/第(\d*)期/igm, (...opt) => {
        //             $('.stage-i').text(opt[1] - 0 + 1);
        //         });
        //     }
        // });

        $('.stage-i').on('input', function () {
            var $hebImg1 = $('.heb-img-1-1, .heb-img-1');
            var isHeader = $hebImg1.length > 0;
            if (isHeader) {
                console.log('isHeader: ', isHeader);

                var $a = $hebImg1.find('a');
                var $text = $hebImg1.find('.add-href-text');

                var stageI = $.trim($(this).text());
                if (stageI == '-') {
                    stageI = localStorage.getItem('hebSageI');
                } else {
                    localStorage.setItem('hebSageI', stageI);
                }
                var val = '' + (stageI || '');
                $a.attr('href', heb1Val + val);
                $text.val(val);
                localStorageSet();
            }
        });
    };
    titleFn();

    // import './copyBtn.js'
    var copyBtn = function copyBtn() {
        $body.append('\n        <div class="btn copy-btn" id="finish-btn">\u5B8C\u6210</div>\n        <div class="btn btn-primary copy-btn hide" id="copy-btn">\u4E0B\u8F7D</div>\n    ');

        // $('#clear-btn').on('click', () => {
        //     localStorage.clear();
        // });
    };

    copyBtn();

    var tips = function tips(text) {
        $('.heb-tips').html(text).show().delay(2000).fadeOut(function () {
            $(this).hide().stop();
        });
    };
    var addHref = function addHref() {
        var copyBtnShow = function copyBtnShow() {
            $('#copy-btn').show();
            $('#finish-btn').hide();
        };

        var copyBtnHide = function copyBtnHide() {
            $('#copy-btn').hide();
            $('#finish-btn').show();
        };

        copyBtnHide();

        $('.add-href').each(function (i, e) {
            var $e = $(e);
            var $a = $e.find('a');
            var $text = $e.find('.add-href-text');
            var val = $text.val();
            var isHeader = $e.hasClass('heb-img-1-1') || $e.hasClass('heb-img-1');
            var heb1Val = 'http://www.xiongan.gov.cn/xiongan-today/?xats';

            if (isHeader == false) {
                heb1Val = '';
            }
            // $a.attr('href', heb1Val + val);

            $text.on('input', function () {
                var $this = $(this);
                val = $this.val();
                $a.attr('href', heb1Val + val);
                if ($this.hasClass('add-href-text2')) {
                    $('.stage-i').text(val.replace('http://www.xiongan.gov.cn/xiongan-today/?xats', ''));
                }
                // localStorageSet();
                // setDownloadDom();
            });

            // console.log('isHeader:', isHeader);
            if (isHeader) {
                var stageI = $.trim($('.stage-i').text());
                console.log('stageI:', stageI);
                if (stageI == '-') {
                    stageI = localStorage.getItem('hebSageI');
                } else {
                    localStorage.setItem('hebSageI', stageI);
                }
                val = '' + (stageI || '');
                $a.attr('href', heb1Val + val);
                $text.val(val);

                window.stageNum = val;

                // localStorageSet();
                // setDownloadDom();
            } else {
                $text.val($a.attr('href'));
            }
        });

        // // 防止读取本地数据后点击图片出现页面跳转
        // $('.add-href a').on('click', (e) => {
        //     e.preventDefault();
        // });

        $('#finish-btn').on('click', function () {
            // $('.add-href-btn').trigger('click');
            $('.add-href').find('.add-href-input').fadeOut(function () {
                $(this).remove();
            });

            // localStorageSet();
            setDownloadDom();
            copyBtnShow();

            $('#copy-btn').click(function () {
                var stage = $.trim($('.stage-i').text());
                alert(':) 马上开始下载 ' + stage + '.html\n 请把下载的文件放入图片文件夹，打开后全选复制到发糕器！！😊');
                export_raw($.trim($('.stage-i').text()) + '.html', window.downloadDom);
            });
        });
    };

    // local
    function fake_click(obj) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        obj.dispatchEvent(ev);
    }

    function export_raw(name, data) {
        var urlObject = window.URL || window.webkitURL || window;

        var export_blob = new Blob([data]);

        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        fake_click(save_link);
    }

    // const uploadTxt = () => {
    //     // const formData = new FormData($('#form-upload-txt')[0]);
    //     // $.ajax({
    //     //     url: '/upload-txt',
    //     //     type: 'POST',
    //     //     data: formData,
    //     //     cache: false,
    //     //     contentType: false,
    //     //     processData: false,
    //     //     success: function (data) {
    //     //         console.log('uploadTxt success data:', data);
    //     //         if (data.hasData == 1) {
    //     //             $('#copy-btn')
    //     //                 .off('click')
    //     //                 .html(`<a href="${data.path}" target="_blank" title="点击下载，解压缩后放入图片目录">${data.filename}</a > `);
    //     //         } else {
    //     //             $('.upload-box').append(`<span class="tips"> 连接不到服务器，请检查网络！</span>`);
    //     //         }
    //     //     },
    //     //     error: function (jqXHR, textStatus, errorThrown) {
    //     //         $('.upload-box').append(`<span class="tips"> 连接不到服务器，请检查网络！</span>`);
    //     //     }
    //     // });


    // };

    var localDataLoad = function localDataLoad() {
        // console.log('mod > localDataLoad.js');
        var $hebPic = $('.heb-pic');
        var hebLocalData = localStorage.getItem('hebLocalData');
        // console.log('hebLocalData: ', hebLocalData);
        if (hebLocalData !== null) {
            $hebPic.html(hebLocalData);
            localStorageSet();
            // $('.add-href').off('click');
            addHref();
        }
    };

    // localDataLoad();


    // $('#textarea-data').on('input', () => {
    //     localStorageSet();
    // });

    $('.heb-textarea-onOff').on('click', function () {
        if ($('#textarea-data').hasClass('hide')) {
            $('#textarea-data').removeClass('hide');
        } else {
            $('#textarea-data').addClass('hide');
        }
    });
});