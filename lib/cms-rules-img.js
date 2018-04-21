'use strict';

const cmsRulesImg = [
    // 图片
    {
        type: '图片地址',
        key: ['图片地址', 'pic-src', 'tpdz'],
        code: '<Picture needcode=0>PictureUrlPh</Picture>',
        remark: '自定义图片规则'
    }, {
        type: '图片',
        key: ['图片', 'pic', 'tp'],
        code: '<Picture needcode=5>PictureUrlPh</Picture>',
        remark: '图片有<img>'
    }, {  
        type: '多图',
        name: ['多图', 'pics', 'dt'],
        code: '<Picture needcode="5" iter="3" bsrc="true" src="PictureUrlPh">PictureUrlPh</Picture>',
        note: '{{多图:num}}'
    }
];

module.exports = cmsRulesImg;
