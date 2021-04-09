const upload = (e) => {
    // const formData = new FormData($('#form-upload-multi')[0]);
    // console.log('formData: ', formData);
    const files = document.getElementById('fileId').files;

    /*
    for (const key in files) {
        if (Object.hasOwnProperty.call(files, key)) {

            //获取读取我文件的File对象
            var selectedFile = files[key];
            var name = selectedFile.name;//读取选中文件的文件名

            const imgName = 'img-' + name.split('.')[0];

            var size = selectedFile.size;//读取选中文件的大小

            console.log("文件名:" + name + "大小:" + size, imgName);

            var reader = new FileReader();//这是核心,读取操作就是由它完成.
            //reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL

            reader.addEventListener("load", function (event) {
                $('.heb-pic').append(`<img src="${event.target.result}" class="${imgName}">`);
                // $('.' + imgName).attr('src', event.target.result);
            }, false);

            reader.readAsDataURL(selectedFile);

        }
    } 
    */

    renderData({
        files,
    });





    // $.ajax({
    //     url: '/upload-multi',
    //     type: 'POST',
    //     data: formData,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     success: function (data) {
    //         renderData(data);
    //         if (data.length) {
    //             $('.upload-box').hide();
    //         }
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         $('.upload-box').append(`
    //             <span class="tips">连接不到服务器，请检查网络！</span>
    //         `);
    //     }
    // });
};

$('#form-submit').on('click', upload);
