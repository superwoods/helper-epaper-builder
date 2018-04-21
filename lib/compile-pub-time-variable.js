'use strict';
const cmsRulesPubTime = require('../lib/cms-rules-pub-time');
const checkType = require('../lib/check-type');
const isArray = (obj) => checkType('Array', obj);

function replacement(...options) {
    let code = cmsRulesPubTime[0].code;

    // 默认时间参数
    let language = 1;
    let BriefMonth = 0;
    let BriefWeek = 0;
    let format = 'YearPh-MonthPh-DayPh HourPh:MinutePh';

    // 如果存在时间参数 {{发布时间: 时间参数}}
    let config = options[3];
    if (config) {
        // console.log('config1: ', config);
        // 语言规则
        if (config.indexOf('英文') !== -1) {
            config = config.replace('英文', '');
            language = 2; // 英文月和星期
        }
        if (config.indexOf('德文') !== -1) {
            config = config.replace('德文', '');
            language = 3; // 德文
        }
        if (config.indexOf('法文') !== -1) {
            config = config.replace('法文', '');
            language = 4; // 法文
        }

        // 简写规则
        if (config.indexOf('简写月') !== -1) {
            config = config.replace(/简写月/g, '');
            BriefMonth = 1;
        }
        if (config.indexOf('简写星期') !== -1) {
            config = config.replace(/简写星期/g, '');
            BriefWeek = 1;
        }

        // 替换格式
        cmsRulesPubTime[0].formats.forEach((value, index, ar) => {
            let regexp = new RegExp(`${value.key}`, 'g');
            // console.log('regexp:', regexp);
            config = config.replace(regexp, value.code);
        });

        // console.log('config2: ', config);
        format = config;
    }

    code = code.replace(/{{language}}/, language);
    code = code.replace(/{{BriefMonth}}/, BriefMonth);
    code = code.replace(/{{BriefWeek}}/, BriefWeek);
    code = code.replace(/{{format}}/, format);

    // console.log('code: ', code);
    return code;
}

const compilePubTimeVariable = (str) => {
    cmsRulesPubTime.forEach((value, index) => {
        const type = value.type || '';
        // 如果规则存在发布时间
        if (type === '发布时间') {
            const key = value.key || '';
            const code = value.code || '';
            const formats = value.formats || '';
            if (isArray(key)) {
                key.forEach((value, index, ar) => {
                    // /\{\{(发布时间?)(\:(.*?))?\}\}/g
                    let regexp = new RegExp(`{{(${value}?)(\:(.*?))?}}`, 'g');
                    // console.log('regexp:', regexp);
                    str = str.replace(regexp, replacement);
                });
            } else {
                console.log('compilePubTimeVariable error key: ' + key);
                return;
            }
        }
    });
    return str;
}

module.exports = compilePubTimeVariable;
