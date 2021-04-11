function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
    );
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
