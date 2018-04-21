'use strict';

const compilePubTimeLanguage = (str) => {
    let language = 1; // 中文

    if (str.indexOf('英文') !== -1) {
        language = 2; // 英文月和星期
        return language;
    }

    if (str.indexOf('德文') !== -1) {
        language = 3; // 德文
        return language;
    }

    if (str.indexOf('法文') !== -1) {
        language = 4; // 法文
        return language;
    }

    return language;
}

module.exports = compilePubTimeLanguage;
