
const attrZhHandler = (attr) => {
    if (attr === '' || attr === null || attr === 'null') {
        attr = '默认';
    } else {
        attr = attr.replace('+61', '图片').replace('+62', '头条').replace('+63', '普通')
    }
    return attr;
}

module.exports = attrZhHandler;
