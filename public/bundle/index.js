'use strict';

// console.log('mod > index.js');
$(function () {
    window.hebContentDom = '';
    window.imgIndex = 0;
    window.isDev = false;

    // const $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $hebPic = $('.heb-pic');

    $html.addClass('is-xa-today-print');
    if (isDev) {
        $html.addClass('is-dev');
    }

    var downDomClean = function downDomClean(dom) {
        return dom.replace(/\/upload\/pic\-\d*\-([\s\S]*?)/gi, '$1').replace(/<span class="add-href-input[\s\S]*?<\/span>?[\s\S]*?<\/span>(<\/span>)?/gim, '');
    };
    var localStorageSet = function localStorageSet() {
        // console.log('mod > localStorageSet.js');
        var $hebPic = $('.heb-pic');
        var dom = $hebPic.html();

        if (dom) {
            localStorage.setItem('hebLocalData', dom);
            dom = downDomClean(dom);
            console.log('downDomClean:\n\n', dom);
            $('#textarea-data').text(dom);
        }
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
        console.log('renderData ajax cb:', data);
        // window.hebDom = '';
        var $hebPic = $('.heb-pic');
        var files = data.files;
        var finishTimer = data.length;
        var renderItems = {};
        var blank = '    ';

        var herfInput = function herfInput(on) {
            return '<span class="add-href-input ' + (on ? 'add-href-input2' : '') + '">' + (on ? '<span class="add-href-base">http://www.xiongan.gov.cn/xiongan-today/?xats</span>' : '') + '<input class="btn add-href-text ' + (on ? 'add-href-text2' : '') + '" value="#" placeholder="\u8BF7\u8F93\u5165\u94FE\u63A5" type="text"><span class="add-href-btn"></span></span>';
        };

        var filter = function filter(e) {
            var originalname = e.originalname;
            var originalnameArray = originalname.split(/\.|-|_/);
            var index = originalnameArray[0];
            var isPrint = /p/ig.test(index);
            if (isPrint === false) {
                index -= 0;
            }
            var img = new Image();
            var className = 'heb-img-' + index;
            // const src = e.path.replace(/public(\/|\\)/ig, window.location.href);
            var src = e.path.replace(/public/ig, '').replace(/\\/ig, '/');

            console.log('filter: ', originalnameArray, index, src);

            img.src = src;
            img.onload = function () {
                var renderItem = {
                    hasChild: false,
                    className: className,
                    originalname: originalname,
                    width: Math.round(img.naturalWidth * pageWidth / naturalWidth),
                    height: Math.round(img.naturalHeight * pageHeight / naturalHeight),
                    src: src,
                    mainName: index
                };

                var isChild = originalnameArray.length >= 3;

                console.log('isNoChild:', isChild);

                if (isChild === false) {
                    renderItems[index] = renderItem;
                } else {
                    if (renderItems.hasOwnProperty(index) === false) {
                        renderItems[index] = {};
                    }
                    var childIndex = originalnameArray[1] - 0;
                    renderItem.className += '-' + childIndex;
                    renderItems[index][childIndex] = renderItem;
                }
                finishTimer--;
            };
        };

        // console.log('files: ', files);

        files.map(function (e, i) {
            imgIndex++;
            filter(e);
        });

        var dom_isPrint = function dom_isPrint(src, className) {
            return '\n' + blank + '<img src="' + src + '" width="100%" height="auto" align="center" class="' + className + '">';
        };
        // herfInput

        var dom_is_p_a_img = function dom_is_p_a_img(src, className) {

            console.log('dom_is_p_a_img:', /heb-img-1/ig.test(className));

            var on = false;
            if ('heb-img-1' == className || 'heb-img-1-1' == className) {
                on = true;
            }
            return '\n<p class="add-href ' + className + '">\n' + blank + '<a href="#" target="_blank">\n' + blank + blank + '<img src="' + src + '" width="100%" height="auto">\n' + blank + '</a>' + herfInput(on) + '\n</p>';
        };

        var renderDom = function renderDom(renderItems) {
            // console.log('renderDom renderItems:', renderItems);
            var dom = '';
            var domPrint = '';
            var domShowPrintImgs = '';

            for (var prop in renderItems) {
                var e = renderItems[prop];
                // regPicName.push(e)
                console.log(prop, e);

                var hasChild = e.hasChild;
                if (hasChild === false) {
                    var isPrint = /p/ig.test(e.mainName);
                    if (isPrint) {
                        console.log('e.src:', e.src);

                        domShowPrintImgs += '\n<li><a href="' + e.src + '" target="_blank" title="' + e.src + '">\n<img width="100%" src="' + e.src + '">\n</a>' + e.originalname + '</li>';
                        if (domPrint == '') {
                            domPrint = '\n<p align="center" class="heb-hide">';
                        }
                        domPrint += dom_isPrint(e.src, e.className);
                    } else {
                        dom += dom_is_p_a_img(e.src, e.className);
                    }
                } else {
                    dom += '\n<div style="width:' + pageWidth + 'px !important;height:' + pageHeight + 'px !important;position:relative;">';

                    var _left$top = {
                        left: 0,
                        top: 0
                    },
                        left = _left$top.left,
                        top = _left$top.top;


                    for (var porp2 in renderItems[prop]) {
                        var e2 = renderItems[prop][porp2];
                        console.log('e2.src:', e2.src);

                        var on = false;
                        if ('heb-img-1' == e2.className || 'heb-img-1-1' == e2.className) {
                            on = true;
                        }

                        dom += '\n' + blank + '<p class="add-href ' + e2.className + '" style="width:' + e2.width + 'px !important;height:' + e2.height + 'px !important;left:' + left + 'px;top:' + top + 'px;position: absolute;">\n' + blank + blank + '<a href="#" target="_blank">\n' + blank + blank + blank + '<img src="' + e2.src + '" width="100%" height="auto">\n' + blank + blank + '</a>\n' + herfInput(on) + '\n' + blank + '</p>';

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
                    dom += '\n</div>';
                }
            }

            if (dom) {
                // 写入 dom
                domPrint = $.trim(domPrint);
                dom = $.trim(dom);
                dom = dom + '\n' + (domPrint ? domPrint + '\n</p>' : '');

                // window.hebDom = dom;
                $hebPic.html(dom);
                localStorageSet();

                addHref();

                if (domShowPrintImgs) {
                    $('.heb-alert-tips').remove();
                    $('.heb-print-tips').append(domShowPrintImgs);
                } else {
                    var _tips = '本次上传似乎缺少打印图，发布后的页面可能无法正常打印！！！';
                    $hebPic.before('<div class="heb-alert-tips">' + _tips + '</div>');
                    // alert(tips);
                }
            }
        };

        // 异步上传队列，上传计数，循环验证是否为全部上传完成，之后生成页面
        var setint = setInterval(function () {
            if (finishTimer === 0) {
                renderDom(renderItems);
                clearInterval(setint);
                setint = null;
            }
        }, 1);
    };

    var uploadBoxFn = function uploadBoxFn() {
        return '\n        <div class="upload-box">\n            <form action="/upload-multi" method="post" enctype="multipart/form-data" id="form-upload-multi">\n                <input class="btn" type="file" name="pic" multiple="multiple">\n                <input class="btn btn-primary" type="button" value="\u4E0A\u4F20\u6587\u4EF6" id="form-submit">\n            </form>\n        </div>\n\n        <div class="heb-main-tips">\n            <h2>\u6253\u5370\u56FE\uFF1A</h2>\n            <ul class="heb-print-tips">\n                <!-- heb-print-tips -->\n            </ul>\n        </div>\n        \n        <div class="heb-main-tips">\n            <h2>\u4E0A\u4F20\u8BF4\u660E\uFF1A</h2>\n            <ul>\n                <li>\u5FC5\u987B\u4F7F\u7528\u6570\u5B57\u6587\u4EF6\u540D\u4F5C\u4E3A\u56FE\u7247\u5E8F\u5217 <code>1.jpg, 2.jpg, 3.jpg...</code> </li>\n                <li>\u5FC5\u987B\u4F7F\u7528 <code>p</code> \u6807\u8BB0\u6253\u5370\u56FE <code>p1.jpg, p2.jpg, p3.jpg...</code></li>\n                <li>\u4F7F\u7528\u5206\u9694\u7B26 <code>_</code> \u5F00\u542F\u62FC\u56FE\u5E03\u5C40 (\u5148\u4E0A\u4E0B\u540E\u5DE6\u53F3) <code>1_1.jpg, 1_2.jpg...</code></li>\n                <li>\u8BF7\u4F7F\u7528\u539F\u59CB\u56FE\u7247\u5C3A\u5BF8\uFF1A<code>' + naturalWidth + ' * ' + naturalHeight + 'px</code></li>\n            </ul>\n            <a href="https://github.com/xinhuaRadioLAB/helper-epaper-builder-doc/issues/1" target="_blank">\u4E86\u89E3\u66F4\u591A\u6216\u53CD\u9988\u95EE\u9898</a>\n        </div>\n    ';
    };
    window.uploadBox = uploadBoxFn();

    // 写入 uploadBox
    $('.heb-pic').after(uploadBox);

    var iframeBg = function iframeBg() {
        if (isDev === false) {
            var winWidth = $body.width();
            var iframeSrc = 'http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm';
            $body.append('<iframe class="heb-bg-iframe" src="' + iframeSrc + '" frameborder="0"></iframe>');

            // set postion
            $('.heb-bg-iframe').css({
                width: winWidth,
                'margin-left': -(winWidth / 2) + 'px'
            });
        }
    };
    iframeBg();
    var upload = function upload(e) {
        var formData = new FormData($('#form-upload-multi')[0]);

        console.log('formData: ', formData);

        $.ajax({
            url: '/upload-multi',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function success(data) {
                renderData(data);
                if (data.length) {
                    $('.upload-box').hide();
                }
            },
            error: function error(jqXHR, textStatus, errorThrown) {
                $('.upload-box').append('\n                <span class="tips">\u8FDE\u63A5\u4E0D\u5230\u670D\u52A1\u5668\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF01</span>\n            ');
            }
        });
    };

    $('#form-submit').on('click', upload);

    var mask = function mask() {
        $body.append('<div class="btn add-mask">\u7A81\u51FA</div>'); //btn-primary 
        var $addMask = $('.add-mask');
        $addMask.on('click', function (e) {
            var $html = $('html');
            var className = 'is-mask';
            var classNameBtnActive = 'btn-primary';
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

        $.ajax({
            url: 'http://www.xiongan.gov.cn/bundle/xat-data.js',
            dataType: "script",
            success: function success() {
                var len = xatData.length;
                var last = xatData[len - 1];
                // console.log('mod > titleFn() data', last);
                last.Title.replace(/第(\d*)期/igm, function () {
                    $('.stage-i').text((arguments.length <= 1 ? undefined : arguments[1]) - 0 + 1);
                });
            }
        });

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
        $body.append('\n        <div class="btn clear-btn" id="clear-btn">\u6E05\u9664</div>\n        <div class="btn copy-btn" id="finish-btn">\u5B8C\u6210</div>\n        <div class="btn btn-primary copy-btn hide" id="copy-btn">\u4E0B\u8F7D</div>\n    ');

        $('#copy-btn').on('click', function () {
            uploadTxt();
        });

        $('#clear-btn').on('click', function () {
            localStorage.clear();
        });
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
                localStorageSet();
            });

            console.log('isHeader:', isHeader);
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

                localStorageSet();
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

            localStorageSet();
            copyBtnShow();
        });
    };

    // local
    var uploadTxt = function uploadTxt() {
        var formData = new FormData($('#form-upload-txt')[0]);
        $.ajax({
            url: '/upload-txt',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function success(data) {
                console.log('uploadTxt success data:', data);
                if (data.hasData == 1) {
                    $('#copy-btn').off('click').html('<a href="' + data.path + '" target="_blank" title="\u70B9\u51FB\u4E0B\u8F7D\uFF0C\u89E3\u538B\u7F29\u540E\u653E\u5165\u56FE\u7247\u76EE\u5F55">' + data.filename + '</a > ');
                } else {
                    $('.upload-box').append('<span class="tips"> \u8FDE\u63A5\u4E0D\u5230\u670D\u52A1\u5668\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF01</span>');
                }
            },
            error: function error(jqXHR, textStatus, errorThrown) {
                $('.upload-box').append('<span class="tips"> \u8FDE\u63A5\u4E0D\u5230\u670D\u52A1\u5668\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF01</span>');
            }
        });
    };

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

    localDataLoad();

    // $('#textarea-data').on('input', () => {
    //     localStorageSet();
    // });
});