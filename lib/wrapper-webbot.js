'use strict';

const wrapperWebbot = ($dom, $, config) => {

    const nodeid = config.nodeid;
    const attr = config.attr;
    const attrZh = config.attrZh;
    const repeat = config.repeat;
    const dom = config.dom;
    const index = config.index;
    const dayspan = config.dayspan;

    const output = `
    <!-- helper-mod: ${index} {{${nodeid}, ${attrZh}, ${repeat}}} BEGIN -->
    <!--webbot bot="AdvTitleList" nodeid="${(nodeid === '') ? '603888' : nodeid}" type="0" spanmode="0" dayspan="${dayspan}" attr="${(attr === '' || attr === 'null' || attr === '默认') ? '' : attr}" comstring="
        ${dom}
    " TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="" startspan -->
    <!--webbot bot="AdvTitleList" endspan i-checksum="0" -->
    <!-- helper-mod: ${index} {{${nodeid}, ${attrZh}, ${repeat}}} END -->
    `;

    $dom.replaceWith(output);
}

module.exports = wrapperWebbot;
