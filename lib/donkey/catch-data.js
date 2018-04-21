'use strict';
const parseString = (dataStr) => {
    let result = {};

    const regTilte = /# (.*)?/g; // title
    const regDataLine = /(.*)\[*]?\|[*]?(.*)?/g; // 一行数据: '页面控制节点 | 11157110'

    // const regCid = /栏目ID:(\d*)/ig;
    // const regNid = /信息片ID:(\d*)/ig;

    let title = null;

    dataStr = dataStr.replace(regTilte, function (...opt) {
        if (opt[1]) {
            title = opt[1].trim();
        }
        return '';
    }).trim().split(/---|—/g);

    // console.log('catchData: ', title, dataStr);


    for (let i in dataStr) {
        let aLine = dataStr[i].trim();
        if (aLine) {
            let list = {};
            aLine.replace(regDataLine, function (...opt) {
                if (opt) {
                    const name = opt[1].trim();
                    if (name) {
                        list[name] = {
                            nid: opt[2] && opt[2].trim() || null,
                        }
                    }
                }
            });
            const n = i - 0 + 1;
            result[title + n] = {
                list: list
            }
        }
    }
    console.log('result: ', result);
    return result;
}

const catchData = (dataStr) => {
    try {
        return JSON.parse(dataStr);
    } catch (e) {
        console.log('catchData: ', e);
        return parseString(dataStr);
    }
}

module.exports = catchData;
