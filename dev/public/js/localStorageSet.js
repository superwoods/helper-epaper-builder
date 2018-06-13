const localStorageSet = () => {
    // console.log('mod > localStorageSet.js');
    const $hebPic = $('.heb-pic');
    const dom = $hebPic.html();
    // console.log('    hebPic dom:', dom);
    if (dom) {
        localStorage.setItem('hebLocalData', dom);
        return dom;
    }
};
