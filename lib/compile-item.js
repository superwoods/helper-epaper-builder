'use strict';
// CMS属性处理器
const attrHandler = require('../lib/attr');
const attrZhHandler = require('../lib/attr-zh');
// 编译器
const compilePubTime = require('../lib/compile-pub-time');
const compilePubTimeVariable = require('../lib/compile-pub-time-variable');
const compileA = require('../lib/compile-a');
const compileImgSrc = require('../lib/compile-img-src');
const compileRepeat = require('../lib/compile-repeat');
// 规则处理器
const ruler = require('../lib/ruler');
const rulerImg = require('../lib/ruler-img');
const rulerBase = require('../lib/ruler-base');
// 移除注释
const removeComments = require('../lib/remove-comments');
// 外包裹处理器
const wrapperWebbot = require('../lib/wrapper-webbot');

// 编译一个 data-helper 块
const compileItem = ($dom, dataHelp, i, $) => {
    const _dataHelp = dataHelp || ['603888', '默认', 0];
    const nodeid = _dataHelp[0];
    const attr = attrHandler(_dataHelp[1]);
    const index = i + 1;
    let repeat = _dataHelp[2];
    // 编译发布时间
    // compilePubTime($dom.find('[data-cms]'), $);
    // 编译a链接
    compileA($dom.find('a'), $);
    // 编译img标签src
    compileImgSrc($dom.find('img'), $)
    // 编译循环
    const compileRepeatResult = compileRepeat($dom, $, repeat);
    // 重新计算repeat
    repeat = compileRepeatResult.repeat;
    // 设置输出模式
    const outputType = compileRepeatResult.outputType;
    // 获取编译后DOM
    let dom = compileRepeatResult.dom;

    // 应用普通变量转换
    dom = ruler(dom);
    // 应用img变量转换
    dom = rulerImg(dom);
    // 应用基础变量转换
    dom = rulerBase(dom);
    // 编译日期变量
    dom = compilePubTimeVariable(dom);
    // 清除注释
    dom = removeComments(dom);

    // 声明中文attr
    const attrZh = attrZhHandler(attr);
    // 声明dayspan
    const dayspan = (repeat < 200 || repeat === undefined) ? 0 : repeat;
    // 包裹cms webbot
    wrapperWebbot($dom, $, {
        nodeid: nodeid,
        attr: attr,
        attrZh: attrZh,
        repeat: repeat,
        outputType: outputType,
        dom: dom,
        index: index,
        dayspan: dayspan
    });

    // 返回编译结果
    return `
    <span class="r1">${index}</span>
    <span class="r2">${nodeid}</span>
    <span class="r3">${attrZh}</span>
    <span class="r4">${repeat}</span>
    `;
};

module.exports = compileItem;
