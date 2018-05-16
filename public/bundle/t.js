$("#import").click(function () {//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
    $("#files").click();
});

function importFn() {
    var files = document.getElementById("files");

    function getObjectURL(file) {
        var url = null;
        if (window.createObjcectURL != undefined) {
            url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }

        console.log(url);

        return url;
    }

    var objURL = getObjectURL(files.files[0]);//这里的objURL就是input file的真实路径  

    console.log(objURL);


    // var selectedFile = files.files[0];//获取读取的File对象


    // var name = selectedFile.name;//读取选中文件的文件名
    // var size = selectedFile.size;//读取选中文件的大小

    // // console.log(document.getElementById("files").files);


    // // console.log("文件名:" + name + "大小：" + size);

    // var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    // reader.readAsText(selectedFile);//读取文件的内容




    // reader.onload = function () {
    //     console.log(reader);


    //     // console.log(this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
    // };
}