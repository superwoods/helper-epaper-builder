const renderData = (data) => {
    console.log('ajax:', data);
    const $hebPic = $('.heb-pic');
    const files = data.files;
    let len = data.length;
    let results = {};
    // const clearfix = '<span style="clear:both; width:100%; height:0; display:block;overflow:hidden"></span>';

    const filter = ({
        e,
        imgIndex,
    }) => {
        const originalname = e.originalname;
        const originalnameArray = originalname.split(/\.|-/);
        const index = originalnameArray[0];

        console.log(originalnameArray, originalnameArray.length);

        const img = new Image();
        const className = `heb-img-${index}`;
        const src = e.path.replace('public', '');

        img.src = src;
        img.onload = () => {
            const result = {
                hasChild: false,
                className: className,
                originalname: originalname,
                width: Math.round(img.naturalWidth * 951 / 1654),
                height: Math.round(img.naturalHeight * 1345 / 2339),
                src: src,
            };
            if (originalnameArray.length < 3) {
                results[index] = result;
            } else {
                if (results.hasOwnProperty(index) === false) {
                    results[index] = {
                        hasChild: true,
                        length: 0,
                    };
                }
                results[index].length++;
                result.className += '-' + originalnameArray[1];
                results[index][originalnameArray[1]] = result;
            }
            len--;
        };
    };

    files.map((e, i) => {
        imgIndex++;
        filter({ e, imgIndex });
        // const dom = `
        //     <p class="${className}">
        //         <img src="${src}" width="100%" height="auto">
        //     </p>
        // `;
        // hebContentDom += dom;
        // $('.upload-box').replaceWith(`
        //     ${dom}
        //     ${uploadBox}
        // `);
    });

    const render = ($target, results) => {
        console.log('results:', results);
        let dom = '';
        for (let prop in results) {
            console.log(prop, results[prop]);
            const e = results[prop];
            const hasChild = e.hasChild;
            if (hasChild === false) {
                dom += `
                    <p class="${e.className}">
                        <img src="${e.src}" width="100%" height="auto">
                    </p>
                `;
            } else {
                dom += '<div class="clearfix">';
                for (let porp2 in results[prop]) {
                    if (porp2 !== 'hasChild' && porp2 !== 'length') {
                        const e2 = results[prop][porp2];
                        if (porp2.length === 4) {
                            if (porp2 === '1' || porp2 === '3') {
                                dom += `
                                    <p class="${e2.className}" style="
                                        width:${e2.width}px;
                                        height:${e2.height}px;
                                        float:left;
                                    ">
                                `;
                            }
                            dom += `<img src="${e2.src}" width="100%" height="auto">`;
                            if (porp2 === '2' || porp2 === '4') {
                                dom += '</p>';
                            }
                        } else {
                            if (porp2 === '1' || porp2 === '2') {
                                dom += `
                                    <p class="${e2.className}" style="
                                        width:${e2.width}px;
                                        height:${e2.height}px;
                                        float:left;
                                    ">
                                `;
                            }
                            dom += `<img src="${e2.src}" width="100%" height="auto">`;
                            if (porp2 === '1' || porp2 === '2') {
                                dom += '</p>';
                            }
                        }
                    }
                }
                dom += '</div>';
            }

        }
        if (dom) {
            $target.append(dom);
        }
    };

    let setint = setInterval(() => {
        if (len === 0) {
            console.log('setInterval:', len, len === 0);
            render($('.heb-pic'), results);
            clearInterval(setint);
            setint = null;
        }
    }, 1);
};



renderData(data);