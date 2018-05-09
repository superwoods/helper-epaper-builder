'use strict';

console.log('index.js');
// $('.heb-main').text().replace(/\n|\r| /igm, '')
var hebContentDom = '';

$(function () {
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var winWidth = $body.width();

    $html.addClass('is-xa-today-print');

    var uploadBoxFn = function uploadBoxFn() {
        return '\n        <div class="upload-box">\n            <form action="/upload-multi" method="post" enctype="multipart/form-data" id="form-upload-multi">\n                <input class="btn" type="file" name="pic" multiple="multiple">\n                <input class="btn btn-primary" type="button" value="\u4E0A\u4F20\u6587\u4EF6" id="form-submit">\n            </form>\n        </div>\n    ';
    };
    ;
    var uploadBox = uploadBoxFn();

    var iframeSrc = isDev ? 'http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm' : '';
    $body.append('\n        <div class="btn btn-primary add-mask">MASK</div>\n        <iframe class="heb-bg-iframe" src="' + iframeSrc + '" frameborder="0"></iframe>\n    ');

    $('.heb-bg-iframe').css({
        width: winWidth,
        'margin-left': -(winWidth / 2) + 'px'
    });

    $('.heb-pic').html(uploadBox);

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
                    var files = data.files;

                    files.map(function (e, i) {
                        var src = e.path.replace('public', '');
                        var dom = '\n            <p>\n                <img class="add-herf" src="' + src + '" width="100%">\n            </p>\n        ';
                        hebContentDom += dom;
                        $('.upload-box').replaceWith('\n            ' + dom + '\n            ' + uploadBox + '\n        ');
                    });
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
});