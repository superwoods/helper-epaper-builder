'use strict';

const cmsPubTime = [{  
    type: '发布时间',
    key: ['发布时间', 'pub-time', 'fbsj'],
    code: `
    <PubTime Language={{language}} BriefMonth={{BriefMonth}} BriefWeek={{BriefWeek}}>
    {{format}}
    </PubTime>
    `,
    remark: '{{发布时间:yyyy-MM-dd hh:mm:ss dddd BriefMonth BriefWeek 英文}}',
    formats: [{
        key: 'yyyy',
        code: 'YearPh',
    }, {
        key: 'MM',
        code: 'MonthPh',
    }, {
        key: 'dd',
        code: 'DayPh',
    }, {
        key: 'hh',
        code: 'HourPh',
    }, {
        key: 'mm',
        code: 'MinutePh',
    }, {
        key: 'ss',
        code: 'SecondPh',
    }, {
        key: 'week|星期',
        code: 'WeekPh',
    }]
}];

module.exports = cmsPubTime;
