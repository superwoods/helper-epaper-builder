'use strict';

const cmsRulesPubTime = require('../lib/cms-rules-pub-time');
const compilePubTimeLanguage = require('../lib/compile-pub-time-language');

const compilePubTime = ($dataCms, $) => {
    $dataCms.each((i, e) => {
        const $e = $(e);
        const key = $e.data('cms');
        if (key === cmsRulesPubTime[0].name[0] || key === cmsRulesPubTime[0].name[1]) {
            const eText = $.trim($e.text());

            // language规则
            const language = compilePubTimeLanguage(eText); // 英文

            console.log('language: ', language);

            // 是否简写
            let BriefMonth = 0;
            let BriefWeek = 0;
            // format规则
            let format = 'YearPh-MonthPh-DayPh';
            // 年月日判断
            if (eText.indexOf('-') !== -1) {
                if (eText.split('-').length <= 2) {
                    format = 'MonthPh-DayPh';
                }
            }
            if (eText.indexOf('/') !== -1) {
                if (eText.split('/').length <= 2) {
                    format = 'MonthPh/DayPh';
                } else {
                    format = 'YearPh/MonthPh/DayPh';
                }
            }
            // 时间判断
            if (eText.indexOf(':') !== -1) {
                if (eText.split(':').length <= 2) {
                    format += ' HourPh:MinutePh';
                } else {
                    format += ' HourPh:MinutePh:SecondPh';
                }
            }
            // 简写月
            if (eText.indexOf('简写月') !== -1 || eText.indexOf('月简写') !== -1) {
                BriefMonth = 1;
            }
            // 星期格式
            if (eText.indexOf('星期') !== -1 || eText.indexOf('周') !== -1 || eText.indexOf('Week') !== -1) {
                format += ' WeekPh';
                // 简写星期
                if (eText.indexOf('周') !== -1 || eText.indexOf('简写星期') !== -1 || eText.indexOf('星期简写') !== -1) {
                    BriefWeek = 1;
                }
            }
            // 中文年月日分隔符
            if (eText.indexOf('年') !== -1 && eText.indexOf('月') !== -1 && eText.indexOf('日') !== -1) {
                format = 'YearPh年MonthPh月DayPh日';
            }


            $e.text(cmsRulesPubTime[0].fn(language, format, BriefMonth, BriefWeek));
        }
    });
    return $dataCms;
}

module.exports = compilePubTime;
