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

    var uploadBoxFn = function uploadBoxFn() {
        return '\n        <div class="upload-box">\n            <form action="/upload-multi" method="post" enctype="multipart/form-data" id="form-upload-multi">\n                <input class="btn" type="file" name="pic" multiple="multiple">\n                <input class="btn btn-primary" type="button" value="\u4E0A\u4F20\u6587\u4EF6" id="form-submit">\n            </form>\n        </div>\n    ';
    };
    window.uploadBox = uploadBoxFn();
    $('.heb-pic').after(uploadBox);
    ;
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
    iframeBg();;
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
                var renderData = function renderData(data) {
                    console.log('ajax:', data);
                    var $hebPic = $('.heb-pic');
                    var files = data.files;
                    var len = data.length;
                    var results = {};
                    // const clearfix = '<span style="clear:both; width:100%; height:0; display:block;overflow:hidden"></span>';

                    var filter = function filter(_ref) {
                        var e = _ref.e,
                            imgIndex = _ref.imgIndex;

                        var originalname = e.originalname;
                        var originalnameArray = originalname.split(/\.|-/);
                        var index = originalnameArray[0];

                        console.log(originalnameArray, originalnameArray.length);

                        var img = new Image();
                        var className = 'heb-img-' + index;
                        var src = e.path.replace('public', '');

                        img.src = src;
                        img.onload = function () {
                            var result = {
                                hasChild: false,
                                className: className,
                                originalname: originalname,
                                width: Math.round(img.naturalWidth * 951 / 1654),
                                height: Math.round(img.naturalHeight * 1345 / 2339),
                                src: src
                            };
                            if (originalnameArray.length < 3) {
                                results[index] = result;
                            } else {
                                if (results.hasOwnProperty(index) === false) {
                                    results[index] = {
                                        hasChild: true,
                                        length: 0
                                    };
                                }
                                results[index].length++;
                                result.className += '-' + originalnameArray[1];
                                results[index][originalnameArray[1]] = result;
                            }
                            len--;
                        };
                    };

                    files.map(function (e, i) {
                        imgIndex++;
                        filter({ e: e, imgIndex: imgIndex });
                        // const dom = `
                        //     <p class="${className}">
                        //         <img src="${src}" width="100%" height="auto">
                        //     </p>
                        // `;
                        // hebContentDom += dom;
                        // $('.upload-box').replaceWith(`
                        //     ${dom}
                        //     ${uploadBox}
                        // `);
                    });

                    var render = function render($target, results) {
                        console.log('results:', results);
                        var dom = '';
                        for (var prop in results) {
                            console.log(prop, results[prop]);
                            var e = results[prop];
                            var hasChild = e.hasChild;
                            if (hasChild === false) {
                                dom += '\n                    <p class="' + e.className + '">\n                        <img src="' + e.src + '" width="100%" height="auto">\n                    </p>\n                ';
                            } else {
                                dom += '<div class="clearfix">';
                                for (var porp2 in results[prop]) {
                                    if (porp2 !== 'hasChild' && porp2 !== 'length') {
                                        var e2 = results[prop][porp2];
                                        if (porp2.length === 4) {
                                            if (porp2 === '1' || porp2 === '3') {
                                                dom += '\n                                    <p class="' + e2.className + '" style="\n                                        width:' + e2.width + 'px;\n                                        height:' + e2.height + 'px;\n                                        float:left;\n                                    ">\n                                ';
                                            }
                                            dom += '<img src="' + e2.src + '" width="100%" height="auto">';
                                            if (porp2 === '2' || porp2 === '4') {
                                                dom += '</p>';
                                            }
                                        } else {
                                            if (porp2 === '1' || porp2 === '2') {
                                                dom += '\n                                    <p class="' + e2.className + '" style="\n                                        width:' + e2.width + 'px;\n                                        height:' + e2.height + 'px;\n                                        float:left;\n                                    ">\n                                ';
                                            }
                                            dom += '<img src="' + e2.src + '" width="100%" height="auto">';
                                            if (porp2 === '1' || porp2 === '2') {
                                                dom += '</p>';
                                            }
                                        }
                                    }
                                }
                                dom += '</div>';
                            }
                        }
                        if (dom) {
                            $target.append(dom);
                        }
                    };

                    var setint = setInterval(function () {
                        if (len === 0) {
                            console.log('setInterval:', len, len === 0);
                            render($('.heb-pic'), results);
                            clearInterval(setint);
                            setint = null;
                        }
                    }, 1);
                };

                renderData(data);;

                $('#form-submit').on('click', upload);
            },
            error: function error(jqXHR, textStatus, errorThrown) {
                $('.upload-box').append('\n                <span class="tips">\u8FDE\u63A5\u4E0D\u5230\u670D\u52A1\u5668\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF01</span>\n            ');
            }
        });
    };

    $('#form-submit').on('click', upload);
    ;
    var mask = function mask() {
        $body.append('<div class="btn btn-primary add-mask">\u7A81\u51FA/\u9884\u89C8</div>');
        var $addMask = $('.add-mask');
        $addMask.on('click', function (e) {
            var $html = $('html');
            var className = 'is-mask';
            var classNameBtnActive = 'btn-primary';
            var isMask = $html.hasClass(className);
            var $e = $(e.currentTarget);
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
    mask();;
    var titleFn = function titleFn() {
        var myDate = new Date();
        var _title$year$month$day = {
            title: '《今日雄安》',
            year: myDate.getFullYear(),
            month: myDate.getMonth(),
            day: myDate.getDate(),
            stage: '?'
        },
            title = _title$year$month$day.title,
            year = _title$year$month$day.year,
            month = _title$year$month$day.month,
            day = _title$year$month$day.day,
            stage = _title$year$month$day.stage;
        // $('title').text(`${title} ${year}年${month}月${day}日 第${stage}期`);

        $('.title-box').html('\n        <div class="title">' + title + '</div>\n        <div class="year">\n            <div class="i" contenteditable="true" class="year-i">' + year + '</div>\u5E74\n        </div>\n        <div class="month">\n            <div class="i" contenteditable="true" class="month-i">' + month + '</div>\u6708\n        </div>\n        <div class="day">\n            <div class="i" contenteditable="true" class="day-i">' + day + '</div>\u65E5\n        </div>\n        <div class="stage">\u7B2C<div class="i" contenteditable="true" class="stage-i">' + stage + '</div>\u671F\n        </div>\n        <div class="i add-title" contenteditable="true"></div>\n    ');
    };
    titleFn();;
});