'use strict';
let cmsRules = [];

const cmsRulesTitle = [ // 标题
    {  
        type: '文字标题',
        key: ['标题无链接', '标题-1', 'Title-no-href', 'btwlj'],
        code: '<Title length="-1">TitlePh</Title>',
        remark: '标题无链接, 针对链接稿'
    }, {  
        type: '文字标题',
        key: ['标题', '标题0', 'Title', 'bt'],
        code: '<Title length="0">TitlePh</Title>',
        remark: '标题有链接'
    }, {  
        type: '文字标题',
        key: ['引题', 'PreTitle', 'yt'],
        code: '<PreTitle>PreTitlePh</PreTitle>',
        reg: 'PreTitle',
    }, {  
        type: '文字标题',
        key: ['副题', 'Subtitle', 'ft'],
        code: '<Subtitle>SubtitlePh</Subtitle>',
        reg: 'Subtitle',
    }
];

const cmsRulesA = [{  
    type: '链接',
    key: ['文章链接地址', '文章链接', '链接', '#', 'wzljdz', 'wzlj', 'lj'],
    code: '<Url>ArticleUrlPh</Url>',
}];

// 普通属性
const cmsRulesPublic = [{  
    type: '普通属性',
    key: ['摘要', 'abs', 'Abstract', 'zy'],
    code: '<Abstract>AbstractPh</Abstract>',
    reg: 'Abstract',
}, {  
    type: '普通属性',
    key: ['作者', 'Author', 'zz'],
    code: '<Author>AuthorPh</Author>',
    reg: 'Author',
}, {  
    type: '普通属性',
    key: ['编辑', 'Editor', 'bj'],
    code: '<Editor>EditorPh</Editor>',
    reg: 'Editor',
}, {  
    type: '普通属性',
    key: ['责任编辑', 'Liability', 'bj'],
    code: '<Liability>LiabilityPh</Liability>',
    reg: 'Liability',
}, {  
    type: '普通属性',
    key: ['正文', 'Content', 'zw'],
    code: '<Content>ContentPh</Content>',
    reg: 'Content',
}, {  
    type: '普通属性',
    key: ['来源', 'Source', 'ly'],
    code: '<Source>SourcePh</Source>',
    reg: 'Source',
}, {  
    type: '普通属性',
    key: ['关键字', 'Keyword', 'gjz'],
    code: '<Keyword>KeywordPh</Keyword>',
    reg: 'Keyword',
}, {  
    type: '普通属性',
    key: ['音频稿件地址', 'AudioArtAddr', 'ypgjdz'],
    code: '<AudioArtAddr>AudioArtAddrPh</AudioArtAddr>',
    reg: 'AudioArtAddr',
}, {  
    type: '普通属性',
    key: ['来源链接地址', 'SourceUrl', 'ypgjdz'],
    code: '<SourceUrl>SourceUrlPh</SourceUrl>',
    reg: 'SourceUrl',
    remark: '来源链接地址,没有a',
}, {  
    type: '普通属性',
    key: ['来源图标', 'SourceIcon', 'lytb'],
    code: '<SourceIcon>SourceIconPh</SourceIcon>',
    reg: 'SourceIcon',
}, {  
    type: '普通属性',
    key: ['图片稿后缀', 'PicIcon', 'tpghz'],
    code: '<PicIcon>PicIconPh</PicIcon>',
    reg: 'PicIcon',
}, {  
    type: '普通属性',
    key: ['顺序号', 'SeqID', 'sxh'],
    code: '<SeqID>SeqIDPh</SeqID>',
    reg: 'SeqID',
}, {  
    type: '普通属性',
    key: ['json格式标志', 'IsJson', 'jsongsbz'],
    code: '<IsJson>IsJsonPh</IsJson>',
    reg: 'IsJson',
}, {  
    type: '普通属性',
    key: ['节点id', 'NodeId', 'jdid'],
    code: '<NodeId>NodeIdPh</NodeId>',
    reg: 'NodeId',
}, {  
    type: '普通属性',
    key: ['链接稿标志', 'IsLink', 'ljgbz'],
    code: '<IsLink>IsLinkPh</IsLink>',
    reg: 'IsLink',
}];

cmsRules = cmsRules.concat(cmsRulesTitle, cmsRulesA, cmsRulesPublic);

module.exports = cmsRules;
