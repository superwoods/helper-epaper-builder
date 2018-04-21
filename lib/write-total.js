'use strict';

const writeTotal = (obj, tag, isDecompile) => {

    let total = '';
    const isDonkey = obj.type === 'donkey';

    if (obj.total && obj.total.list && obj.total.list.length) {
        total += `
        <ul class="list-top">
            ${(tag)?'<'+tag+' class="item end">':''}
                <span class="len">${isDecompile?'反':''}编译 (共 ${obj.total.list.length} 项)</span>
                <span class="time">${obj.time}</span>
            ${(tag)?'</'+tag+'>':'<br>'}
            <li class="item top">
                <span class="r1">序号</span>
                <span class="r2">信息片</span>
                <span class="r3">属性</span>
                <span class="r4">${isDecompile ? '基本属性 <=> helper变量' : '循环'}</span>
                ${isDecompile ? '<span class="r5">统计</span>' :''}
            </li>
        </ul>
        <ul class="list">
        `;
        for (var index in obj.total.list) {
            total += `
            ${(tag)?'<'+tag+' class="item">':''}
                ${obj.total.list[index]}
            ${(tag)?'</'+tag+'>':'<br>'}
            `;
        }
        total += '</ul>';
    }

    if (obj.compileSrcObj && obj.compileSrcObj.index) {
        total += `
        <ul class="list-top compile-src">
            ${(tag)?'<'+tag+' class="item end">':''}
                <span class="len">替换资源路径 (共 ${obj.compileSrcObj.index} 项)</span>
                <span class="time">${ obj.replaceSrc ? obj.replaceSrc : '无'}</span>
            ${(tag)?'</'+tag+'>':'<br>'}
            <li class="item top">
                <span class="r1">序号</span>
                <span class="r2">标签属性</span>
                <span class="r3">细节</span>
            </li>
        </ul>
        <ul class="list compile-src">
        `;
        for (let index in obj.compileSrcObj.list) {
            const item = obj.compileSrcObj.list[index];
            let list = `
            ${(tag)?'<'+tag+' class="item">':''}
            `;
            list += `
                <span class="r1">${item.index}</span>
                <span class="r2">${item.prop}</span>
                <span class="r3"><a href="${item.replacementSrc}" target="_blank" title="${item.replacementSrc}">${item.value}</a></span>
            `;
            list += `
            ${(tag)?'</'+tag+'>':'<br>'}
            `;
            total += list;
        }
        total += '</ul>';
    }

    if (isDonkey) {
        total = `
        <div class="err">
            <span class="oops oops-done">Well done!</span> 🦄 <span class="text">完成模版制作，请您 <a href="${obj.dist}">猛击下载</a>.</span> 🎉 🍻
        </div>
        <ul class="list-top err-list">
            ${(tag)?'<'+tag+' class="item end">':''}
                <span class="len">完成模版制作 (共 ${obj.donkey.index} 项)</span>
                <span class="time">${obj.time}</span>
            ${(tag)?'</'+tag+'>':'<br>'}
        </ul>
        `;
    } else {
        if (!total) {
            total = `
            <div class="err">
                <span class="oops">Oops!</span> <span class="text">似乎什么也没有编译.</span> 🤔
            </div>
            <ul class="list-top err-list">
                ${(tag)?'<'+tag+' class="item end">':''}
                    <span class="len">你仍然可以下载查看, 我帮你标注了上传时间：</span>
                    <span class="time">${obj.time}</span>
                ${(tag)?'</'+tag+'>':'<br>'}
            </ul>
            `;
        }
    }

    return total;
}

module.exports = writeTotal;
