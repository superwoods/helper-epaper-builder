const setDownloadDom = () => {
    // console.log('mod > localStorageSet.js');
    const forShowDom = $('#heb-picDomTarget').html();

    $('.heb-picHideDom')
        .html(forShowDom)
        .find('img').each((i, e) => {
            // console.log(e, i);
            $(e).attr('src', $(e).attr('data-src'));
        });

    let downloadDom = $('.heb-picHideDom').html();

    if (downloadDom) {

        // localStorage.setItem('hebLocalData', forShowDom);

        downloadDom = downDomClean(downloadDom);
        console.log('downDomClean downdom:\n\n', downloadDom);
        $('#textarea-data').text(downloadDom);
    }

    window.downloadDom = downloadDom;
};
