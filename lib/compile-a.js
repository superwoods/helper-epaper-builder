'use strict';

const compileA = ($a, $) => {

    console.log($a.parent('url').length === 0);

    if ($a.parent('url').length === 0) {
        $a.attr('href', 'ArticleUrlPh').before(`URL_BEGIN`).prepend(`URL_END`);
    }
    return $a;
}

module.exports = compileA;
