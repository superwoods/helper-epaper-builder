const upload = (e) => {
    // const formData = new FormData($('#form-upload-multi')[0]);

    // console.log('formData: ', formData);

    /**
    var objFile = document.getElementById("fileId");
    if (objFile.value == "") {
        alert("不能空");
    }

    console.log(objFile.files[0].size); // 文件字节数

    var files = $('#fileId').prop('files');//获取到文件列表

    if (files.length == 0) {

        alert('请选择文件');

    } else {

        var reader = new FileReader();//新建一个FileReader

        reader.readAsText(files[0], "UTF-8");//读取文件

        reader.onload = function (evt) { //读取完文件之后会回来这里

            var fileString = evt.target.result; // 读取文件内容

            console.log(evt);

        };
    } 
    */


    //获取读取我文件的File对象
    var selectedFile = document.getElementById('fileId').files[0];
    var name = selectedFile.name;//读取选中文件的文件名

    // console.log(document.getElementById('fileId').files);

    var size = selectedFile.size;//读取选中文件的大小
    console.log("文件名:" + name + "大小:" + size);

    var reader = new FileReader();//这是核心,读取操作就是由它完成.
    //reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
    reader.onload = function (event) {
        //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        // console.log(this.result);
        var img = document.getElementById("preview-img");

        // 图片路径设置为读取的图片    
        img.src = event.target.result;

        console.log($('#preview-img'));
    };

    reader.readAsDataURL(selectedFile);




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
