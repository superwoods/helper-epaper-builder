'use strict';
const footer = require('./footer');
const index = (err) => {
    global.HELP_CMS.uploadOrgFileType = null;
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Helper Compiler</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="box">
        <h2 class="index-title"><img src="/project-helper.png" width="30" class="index-logo"> Helper Compiler</h2>
        <form action="/upload" method="post" enctype="multipart/form-data">

            ${ err ? '<div class="err"><label for="html-input">' + err + '</label></div>' : '<div class="err tips"><label for="html-input">选择文件</label></div>'}
            <div class="box-form">
                <input type="file" name="html" id="html-input" class="btn btn-file">
            </div>
            <div class="box-textarea">
                <label for="donkey-data" class="src-label" id="donkey-data-label">批量配置 🦄️ :</label>
                <textarea name="donkey-data" id="donkey-data" class="donkey-data-textarea">
# vr20180309

vr-title | [全景雄安]走进向村_中国雄安
vr-src | http://www.xiongan.gov.cn/?1
---
vr-title | [全景雄安]走进向村_中国雄安2
vr-src | http://www.xiongan.gov.cn/?2
                </textarea>
<!-- 
# 页面名称

页面控制节点 | 11157110
首屏 | 11157113
头像 | 11157131
精彩观点 | 11157132
嘉宾简介 | 11157115
往期对话 | 11157116
系列访谈 | 11157117
---
页面控制节点 | 11157111
首屏 | 11157119
头像 | 11157133
精彩观点 | 11157134
嘉宾简介 | 11157121
往期对话 | 11157122
系列访谈 | 11157123
-->
            </div>
            <div class="box-input">
                <label for="replace-src" class="src-label" id="replace-src-label">替换地址: </label>
                <input type="text" name="replace-src" id="replace-src" class="src-input" value="">
            </div>
            <div class="box-submit">
                <input type="submit" value="提 交" class="btn btn-submit btn-primary" id="submit">
            </div>
        </form>
        ${footer()}
    </div>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/index.js"></script>
</body>
</html>
`;
};

module.exports = index;
