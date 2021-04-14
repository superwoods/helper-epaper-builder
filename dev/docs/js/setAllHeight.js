let setAllHeight_settimeout;
function setAllHeight(filesNum) {
    clearTimeout(setAllHeight_settimeout);
    setAllHeight_settimeout = null;
    setAllHeight_settimeout = setTimeout(() => {
        console.log('filesNum:', filesNum);

        if (filesNum == undefined) {
            filesNum = $('#heb-picDomTarget').find('img').length;
        }

        let h = $('#heb-picDomTarget').outerHeight();
        h += (filesNum >= 5 ? 2000 : 1000);
        $('.heb-box-in').height(h);
        $('.heb-box').height(h + 400);
    }, 400);
}