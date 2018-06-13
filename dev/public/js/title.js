const titleFn = () => {
    // console.log('mod > title.js');

    const myDate = new Date();

    let { title, year, month, day, stage } = {
        title: '《今日雄安》',
        year: myDate.getFullYear(),
        month: myDate.getMonth() + 1,
        day: myDate.getDate() + 1,
        stage: '-',
    };

    $('.title-box').html(`
        <div class="title">${title}</div>
        <div class="year">
            <div contenteditable="true" class="i year-i">${year}</div>年
        </div>
        <div class="month">
            <div contenteditable="true" class="i month-i">${month}</div>月
        </div>
        <div class="day">
            <div contenteditable="true" class="i day-i">${day}</div>日
        </div>
        <div class="stage">第<div contenteditable="true" class="i stage-i">${stage}</div>期
        </div>
        <div class="i add-title" contenteditable="true"></div>
    `);

    $.ajax({
        url: 'http://www.xiongan.gov.cn/bundle/xat-data.js',
        dataType: "script",
        success() {
            const len = xatData.length;
            const last = xatData[len - 1];
            // console.log('mod > titleFn() data', last);
            last.Title.replace(/第(\d*)期/igm, (...opt) => {
                $('.stage-i').text(opt[1] - 0 + 1);
            });
        }
    });

};
titleFn();