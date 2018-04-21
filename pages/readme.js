'use strict';
const fs = require('fs');
const footer = require('./footer');
let cmsRules = require('../lib/cms-rules');

const writeCmsRules = () => {
    let result = '';
    cmsRules.forEach((value, index) => {
        const type = value.type || '';
        const key = value.key || ['--'];
        const code = value.code || '--';
        const remark = value.remark || '';

        let keys = '';

        key.forEach((value, index) => {
            keys += `<code class="value">{{${value}}}</code>`;
        });

        result += `
            <li class="readme-item">
                <span class="readme-r1">${key[0]}</span>
                <span class="readme-r2">${keys}</span>
                <span class="readme-r3"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></span>
                <span class="readme-r4">${type} <br> ${remark.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
            </li>
            `;
    });
    return result;
}

const readme = (err) => {
    const readmeHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>readme</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <div class="box readme">
        <h1 class="readme-h1">Helper Rules README</h1>
        ${footer('readme-box', '<a href="/" class="readme-back-homepage">返回首页&gt;&gt;</a>')}
        <ul class="readme-list">
            <li class="readme-t readme-item">
                <span class="readme-r1">属性</span>
                <span class="readme-r2">可识别关键字</span>
                <span class="readme-r3">替换为CMS代码</span>
                <span class="readme-r4">备注</span>
            </li>
            ${writeCmsRules()}
        </ul>
        ${footer('readme-box', '<a href="/" class="readme-back-homepage">返回首页&gt;&gt;</a>')}
    </div>
</body>
</html>
`;

    fs.writeFile('public/readme.html', readmeHtml, 'utf8', function(err) {
        if (err) {
            console.error('writeTemplate err:', err);
            return;
        };
        // obj.res.send(pagesResult(obj));
    });
};

module.exports = readme;
