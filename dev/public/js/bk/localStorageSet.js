const localStorageSet = () => {
    // console.log('mod > localStorageSet.js');
    const $hebPic = $('.heb-pic');
    let dom = $hebPic.html();

    if (dom) {
        // localStorage.setItem('hebLocalData', dom);
        dom = downDomClean(dom);
        console.log('downDomClean:\n\n', dom);
        $('#textarea-data').text(dom);
    }
};
