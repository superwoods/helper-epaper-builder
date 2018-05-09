const titleFn = () => {
    const myDate = new Date();
    let { title, year, month, day, stage } = {
        title: '《今日雄安》',
        year: myDate.getFullYear(),
        month: myDate.getMonth(),
        day: myDate.getDate(),
        stage: '?',
    };
    // $('title').text(`${title} ${year}年${month}月${day}日 第${stage}期`);
    $('.title-box').html(`
        <div class="title">${title}</div>
        <div class="year">
            <div class="i" contenteditable="true" class="year-i">${year}</div>年
        </div>
        <div class="month">
            <div class="i" contenteditable="true" class="month-i">${month}</div>月
        </div>
        <div class="day">
            <div class="i" contenteditable="true" class="day-i">${day}</div>日
        </div>
        <div class="stage">第<div class="i" contenteditable="true" class="stage-i">${stage}</div>期
        </div>
        <div class="i add-title" contenteditable="true"></div>
    `);
};
titleFn();