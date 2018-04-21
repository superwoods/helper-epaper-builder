'use strict';

const packageJSON = require('../package');

module.exports = (className, addDom) => `
<div class="footer ${ className ? className : ''}">
    <a id="jump-helper-tool" href="https://xinhuaradiolab.github.io/helper/tool/" target="_blank" class="readme-red-btn" >[CMS数据信息格式工具]</a> 
    <a href="readme.html" target="_blank" class="readme-red-btn">[README]</a>
    <a href="${packageJSON.homepage}" target="_blank">${packageJSON.name}</a>
    v${packageJSON.version}
    ${ addDom ? addDom : ''}
</div>
`;
