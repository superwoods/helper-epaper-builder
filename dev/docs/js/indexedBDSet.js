function indexedBDSet() {
    // console.log('mod > indexedBDSet.js');
    const $hebPic = $('#heb-picDomTarget'); // $('.heb-pic');
    let dom = $hebPic.html();
    if (dom) {
        // localStorage.setItem('hebLocalData', dom);
        // dom = downDomClean(dom);
        // console.log('downDomClean:\n\n', dom);
        // $('#textarea-data').text(dom);
        dbObj.put({
            name: $.trim($('.stage-i').text()),
            dom: dom
        }, 1);
    }
}
