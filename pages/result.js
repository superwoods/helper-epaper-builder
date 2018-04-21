'use strict';

const writeTotal = require('../lib/write-total');
const footer = require('./footer');

const result = (obj) => {
    global.HELP_CMS.uploadOrgFileType = null;

    const isDecompile = obj.isDecompile;
    const isDonkey = obj.type === 'donkey';

    let title = isDecompile ? '反编译完成！' : '编译完成！';
    let subTitle = isDecompile ? '反编译细节:' : '编译细节:';
    let className = isDecompile ? 'decompile' : 'compile';

    if (isDonkey) {
        title = '模版制作完成';
        subTitle = '模版制作细节:';
        className = 'donkey';
    }

    const distName = obj.dist.replace(global.HELP_CMS.download+'/', '');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>
        ${title}
    </title>
    <link rel="stylesheet" href="/css/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div class="box ${className}">
        <h1>${title}</h1>
        <div>${subTitle}</div>
        <div class="btn-box">
            <a href="${obj.dist}" class="btn btn-primary">下载 ${distName}</a>
            <a href="/" class="btn">返 回</a>
        </div>
        ${writeTotal(obj, 'li', isDecompile)}
        <div class="btn-box btn-box-end">
            <a href="${obj.dist}" class="btn btn-primary">下载 ${distName}</a>
            <a href="/" class="btn">返 回</a>
        </div>
        ${footer(className)}
    </div>
</body>
</html>
`;
};

module.exports = result;
