'use strict';

// const cmsRulesImgSrc = '<Picture needcode=0>PictureUrlPh</Picture>';
const cmsRulesImg = require('../lib/cms-rules-img');
const cmsRulesImgSrc = cmsRulesImg[0].code;

const compileImgSrc = ($img, $) => {
    $img.each((i, e) => {
        let $e = $(e);
        if ($e.attr('src')) {
            $e.attr('src', cmsRulesImgSrc);
        } else if ($e.attr('data-src')) {
            $e.attr('data-src', cmsRulesImgSrc);
        } else if ($e.attr('data-original')) {
            $e.attr('data-original', cmsRulesImgSrc);
        }
    });
    return $img;
}
module.exports = compileImgSrc;
