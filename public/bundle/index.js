'use strict';

console.log('index.js');
// $('.heb-main').text().replace(/\n|\r| /igm, '')

$(function () {
    window.hebContentDom = '';
    window.imgIndex = 0;

    var $window = $(window);
    var $html = $('html');
    var $body = $('body');

    $html.addClass('is-xa-today-print');

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
        console.log('ajax:', data);
        window.hebDom = '';

        var $hebPic = $('.heb-pic');
        var files = data.files;
        var finishTimer = data.length;
        var results = {};

        var filter = function filter(_ref) {
            var e = _ref.e,
                imgIndex = _ref.imgIndex;

            var originalname = e.originalname;
            var originalnameArray = originalname.split(/\.|-|_/);
            var index = originalnameArray[0];
            var img = new Image();
            var className = 'heb-img-' + index;
            var src = e.path.replace('public/', window.location.href);

            img.src = src;
            img.onload = function () {
                var result = {
                    hasChild: false,
                    className: className,
                    originalname: originalname,
                    width: Math.round(img.naturalWidth * pageWidth / naturalWidth),
                    height: Math.round(img.naturalHeight * pageHeight / naturalHeight),
                    src: src,
                    mainName: index
                };

                if (originalnameArray.length < 3) {
                    results[index] = result;
                } else {
                    if (results.hasOwnProperty(index) === false) {
                        results[index] = {};
                    }
                    result.className += '-' + originalnameArray[1];
                    results[index][originalnameArray[1]] = result;
                }
                finishTimer--;
            };
        };

        files.map(function (e, i) {
            imgIndex++;
            filter({ e: e, imgIndex: imgIndex });
        });

        var renderDom = function renderDom($target, results) {
            // console.log('results:', results);
            var dom = '';
            var domPrint = '';
            for (var prop in results) {
                var e = results[prop];

                console.log(prop, e);

                var hasChild = e.hasChild;
                if (hasChild === false) {
                    var isPrint = /p/ig.test(e.mainName);
                    if (isPrint) {

                        domPrint += '    <li><a href="' + e.src + '" target="_blank" title="' + e.src + '"><img width="100%" src="' + e.src + '"></a>' + e.originalname + '</li>\n';

                        dom += '<p align="center" class="heb-hide ' + e.className + '">\n    <img src="' + e.src + '" width="100%" height="auto" align="center">\n</p>\n\n';
                    } else {
                        dom += '<p class="add-href ' + e.className + '">\n    <img src="' + e.src + '" width="100%" height="auto">\n</p>\n\n';
                    }
                } else {
                    dom += '<div style="width:' + pageWidth + 'px;height:' + pageHeight + 'px;position:relative;">\n';

                    var _left$top = {
                        left: 0,
                        top: 0
                    },
                        left = _left$top.left,
                        top = _left$top.top;


                    for (var porp2 in results[prop]) {

                        var e2 = results[prop][porp2];

                        dom += '    <p class="add-href ' + e2.className + '" style="width:' + e2.width + 'px;height:' + e2.height + 'px;left:' + left + 'px;top:' + top + 'px;position: absolute;">\n         <img src="' + e2.src + '" width="100%" height="auto">\n     </p>\n';

                        // 拼接定位 StART / 不支持3列
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
                    var _tips = '本次上传似乎缺少打印图，发布后的页面可能会无法正常打印！！！';
                    $target.before('<div class="heb-alert-tips">' + _tips + '</div>');
                    // alert(tips);
                }
            }
        };

        var setint = setInterval(function () {
            if (finishTimer === 0) {
                renderDom($('.heb-pic'), results);
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
    var upload = function upload() {
        var formData = new FormData($('#form-upload-multi')[0]);
        $.ajax({
            url: '/upload-multi',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function success(data) {
                renderData(data);
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
                console.log('data', last);
                last.Title.replace(/第(\d*)期/igm, function () {
                    $('.stage-i').text((arguments.length <= 1 ? undefined : arguments[1]) - 0 + 1);
                });
            }
        });
    };
    titleFn();
    var copyBtn = function copyBtn() {
        $body.append('\n        <div class="btn copy-btn hide" id="finish-btn">\u5B8C\u6210</div>\n        <div class="btn btn-primary copy-btn hide" id="copy-btn">\u590D\u5236</div>\n    ');

        var clipboard = new ClipboardJS($('#copy-btn')[0], {
            text: function text(trigger) {
                return $('.heb-pic').html();
            }
        });

        $('#copy-btn').on('click', function () {
            clipboard.on('success', function (e) {
                console.log('success: ', e);
                if (e.action === 'copy') {
                    tips('已复制，Ctrl+V 粘贴');
                }
            });

            clipboard.on('error', function (e) {
                console.log('error: ', e);
            });
        });

        // 解决首次加载需点击两次复制按钮才能完成复制的问题
        $('#copy-btn').trigger('click');
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

        var herfInput = function herfInput(value) {
            return '\n    <div class="add-href-input">\n        <input class="btn add-href-text" value="' + (value ? value : '') + '" placeholder="\u8BF7\u8F93\u5165\u94FE\u63A5" type="text">\n        <div class="add-href-btn"></div>\n    </div>';
        };

        var addA = function addA(_ref2) {
            var $addHref = _ref2.$addHref,
                val = _ref2.val;

            $addHref.find('img').wrap('<a href="' + (val || '#') + '" target="_blank"></a>');

            var $a = $addHref.find('a');
            $a.on('click', function (e) {
                e.preventDefault();
            });
        };

        var addHrfBtn = function addHrfBtn(_ref3) {
            var $addHref = _ref3.$addHref,
                hasA = _ref3.hasA,
                $img = _ref3.$img;

            var $addHrefInput = $addHref.find('.add-href-input');
            var $btn = $addHrefInput.find('.add-href-btn');
            $btn.on('click', function () {
                if (hasA === false) {
                    var $text = $addHrefInput.find('.add-href-text');
                    var val = $text.val();
                    addA({
                        $addHref: $addHref,
                        val: val
                    });
                }
                $addHrefInput.fadeOut(function () {
                    $(this).remove();
                    copyBtnShow();
                });
            });
        };

        var onChange = function onChange(_ref4) {
            var $addHref = _ref4.$addHref;

            var $text = $addHref.find('.add-href-text');
            $text.on('input', function () {
                var $this = $(this);
                var val = $this.val();
                var $a = $addHref.find('a');
                var hasA = $a.length > 0;
                if (hasA === false) {
                    addA({
                        $addHref: $addHref,
                        val: val
                    });
                } else {
                    $a.attr('href', val);
                }
                $a.on('click', function (e) {
                    e.preventDefault();
                });
            });
        };

        $('.add-href').on('click', function () {
            copyBtnHide();

            var $this = $(this);
            var $img = $this.find('img');

            var $a = $this.find('a');
            var $addHrefInput = $this.find('.add-href-input');
            var hasA = $a.length > 0;
            var hasInput = $addHrefInput.length > 0;

            console.log('hasA', hasA, $a.length);

            if (hasInput === false) {
                var _herfInput = herfInput();
                var isHeader = $this.hasClass('heb-img-1');
                if (isHeader) {
                    var stageI = $.trim($('.stage-i').text());
                    _herfInput = herfInput('http://www.xiongan.gov.cn/xiongan-today/?xats' + (stageI || ''));
                }
                if (hasA) {
                    var href = $a.attr('href');
                    _herfInput = herfInput(href);
                }
                $this.append(_herfInput);
            }

            addHrfBtn({
                $addHref: $this,
                hasA: hasA,
                $img: $img
            });

            onChange({
                $addHref: $this
            });
        });

        $('#finish-btn').on('click', function () {
            copyBtnShow();
            $('.add-href-btn').trigger('click');
        });
    };
});