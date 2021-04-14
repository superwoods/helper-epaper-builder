const localDataLoad = () => {
    // console.log('mod > localDataLoad.js');
    const $hebPic = $('.heb-pic');
    const hebLocalData = localStorage.getItem('hebLocalData');
    // console.log('hebLocalData: ', hebLocalData);
    if (hebLocalData !== null) {
        $hebPic.html(hebLocalData);
        // localStorageSet();
        // $('.add-href').off('click');
        addHref();
    }
};

// localDataLoad();
