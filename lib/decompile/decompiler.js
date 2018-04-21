'use strict';
const styleHtml = require('html');

const addComments = require('../../lib/add-comments');
const compileItem = require('../../lib/compile-item');
const writeTemplate = require('../../lib/write-template');

const catchAttr = require('../../lib/decompile/catch-attr');
const formatKeys = require('../../lib/decompile/format-keys');
const regexpTitle = require('../../lib/decompile/regexp-title');
const regexpPic = require('../../lib/decompile/regexp-pic');
const regexpWebbot = require('../../lib/decompile/regexp-webbot');
const regexpBase = require('../../lib/decompile/regexp-base');
const regexpRepeat = require('../../lib/decompile/regexp-repeat');
const regexpArticle = require('../../lib/decompile/regexp-article');
const regexpUl = require('../../lib/decompile/regexp-ul');

const regexpTag = /<([\s\S]*?)?>/im;

const decompiler = (obj) => {
    let res = obj.res;
    let file = obj.file;
    // let $ = obj.$;
    let time = obj.time;
    let str = obj.str;

    let index = 0;

    // 编译结果
    let total = {
        list: []
    };

    // 反编译
    let html = str;


    function replacement(...opt) {
        // 声明编译信息变量
        let repeat = 0;
        let article = 0;
        let detailLen = 0;
        let detail = '';

        // 反编译属性对象，包含 webbot 的所有属性
        const webbotAttrs = catchAttr(opt[1].trim(), formatKeys);

        let nodeid = webbotAttrs['nodeid'];
        if (!nodeid) {
            nodeid = 603888;
        }

        let attr = webbotAttrs['attr'];
        if (attr) {
            attr = attr.replace(/\+/g, '');
            attr = attr.replace(/61/, '图片');
            attr = attr.replace(/62/, '头条');
            attr = attr.replace(/63/, '普通');
        } else {
            attr = '默认';
        }

        const resultHandler = (result, reg) => {
            detailLen++;
            detail += `
            <div class="code-box">
                ${ reg ? '<span class="code-title">' + reg + '</span>':''}
                <code>{{${result}}}</code>
            </div>
            `;
            return `{{${result}}}`;
        };

        /*
         * ----------------------------------------------------------------------
         *                       处理 comstring 内容
         * ----------------------------------------------------------------------
         */
        let comstring = webbotAttrs['comstring'];

        // 反编译基础符号（*必须且优先） & url 标签，
        comstring = comstring.replace(/&lt;/ig, '<')
            .replace(/&gt;/ig, '>')
            .replace(/#enpquot#/ig, '"');

        comstring = styleHtml.prettyPrint(comstring);

        // 文章链接
        comstring = comstring.replace(/ArticleUrlPh/igm, function() {
            let result = '文章链接';
            return resultHandler(result, 'ArticleUrlPh');
        });

        // 图片和图片地址
        comstring = comstring.replace(regexpPic, function(...opt) {
            let result = '图片';
            if (opt && opt[1] - 0 === 0) {
                result += '地址'
            }
            return resultHandler(result, `Picture needcode=${opt[1] ? opt[1].trim() : opt[1]}`);
        });

        // 反编译 标题
        comstring = comstring.replace(regexpTitle, function(...opt) {
            let result = '标题';
            if (opt && /-1/ig.test(opt[1])) {
                result += '无链接'
            }
            return resultHandler(result, `Title${opt[1]}`);
        });

        // 反编译 base 常规属性
        for (var i = 0; i < regexpBase.length; i++) {
            const reg = regexpBase[i].reg;
            const key = regexpBase[i].key;
            const regexp = regexpBase[i].regexp;
            // console.log('for regexpBase: ', regexp, key, reg);
            comstring = comstring.replace(regexp, () => resultHandler(key, reg));
        }

        // console.log('comstring1:', comstring);

        // 移除 </url>
        comstring = comstring.replace(/<\/Url>/ig, '');
        // 反编译 url 启始标签
        let aTarget = null;
        comstring = comstring.replace(/<Url([\s\S]*?)>/igm, function() {
            aTarget = `target="_blank"`;
            return '';
        });

        if (aTarget) {
            comstring = comstring.replace(/<a href=([\s\S]*?)?>/igm, function(...opt) {
                let result = '<a href=';
                opt[1] = opt[1].trim();
                if (opt[1].indexOf('"') === -1) {
                    result += `"${opt[1]}"`;
                } else {
                    result += `${opt[1]}`;
                }
                if (opt[1].indexOf('target') === -1) {
                    result += ` ${aTarget}`;
                }
                return result + '>';
            });
        }

        // 计算内部 Article 数量
        const matchArticle = comstring.match(regexpArticle);
        if (matchArticle) {
            article = matchArticle.length;
        }

        // 单独的 Article
        if (article <= 1) {
            // 反编译非跳稿 Repeat，并复制 Repeat 内容
            const isRepeat = regexpRepeat.test(comstring);
            if (isRepeat) {
                comstring = comstring.replace(regexpRepeat, function(...opt) {
                    let result = '';
                    let begin = opt[1].trim();
                    if (begin.indexOf('"') !== -1) {
                        begin = begin.replace(/"/g, '');
                    }
                    let end = opt[2].trim();
                    if (end.indexOf('"') !== -1) {
                        end = end.replace(/"/g, '');
                    }
                    let content = opt[3].trim();
                    for (var i = 0; i < end; i++) {
                        result += content;
                    }
                    repeat = end;
                    return result;
                });
            }
            comstring = comstring.replace(regexpArticle, function(...opt) {
                opt[1] = opt[1].trim();

                console.log('regexpArticle:', opt[1].indexOf('data-item='), opt[1].indexOf('data-item=') === -1);

                if (opt[1].indexOf('data-item=') === -1 && isRepeat) {
                    opt[1] = opt[1].replace(regexpTag, '<$1 data-item="1">');
                }
                return opt[1];
            });
        } else {
            detailLen += `<div class="is-jump-article">有跳稿: ${article}</div>`;
        }

        // const dataHelper = `data-helper="${nodeid}, ${attr}${(repeat > 1)?', ' + repeat : ''}"`;
        // // 如果有 ul
        // const hasUl = comstring.match(regexpUl);
        // if (hasUl) {
        //     comstring = comstring.replace(regexpUl, function(...opt) {
        //         return `<ul${opt[1]} ${dataHelper}>${opt[2]}</ul>`;
        //     });
        // } else {
        //     comstring = `<div ${dataHelper}>${comstring}</div>`;
        // }

        // 统计反编译结果
        index++; // 反编译模块 + 1
        const list = `
            <span class="r1">${index}</span>
            <span class="r2">${nodeid}</span>
            <span class="r3">${attr}</span>
            <span class="r4">${detail}</span>
            <span class="r5">${detailLen}</span>
        `;
        total.list.push(list);

        // 返回 webbot 替换结果
        return comstring;
    }

    html = html.replace(regexpWebbot, replacement);

    html = addComments({
        'type': 'decompile',
        'length': total.list.length,
        'time': time,
        'html': html,
        'name': file.originalname
    });

    file = file.path.replace(`${global.HELP_CMS.upload}/org`, `${global.HELP_CMS.download}/he`);

    const result = {
        isDecompile: true,
        html: html,
        dist: file,
        time: time,
        total: total,
        res: res,
        // replaceSrc: replaceSrc,
        compileSrcObj: null,
    };

    writeTemplate(result);
}

module.exports = decompiler;
