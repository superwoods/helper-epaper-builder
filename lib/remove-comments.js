'use strict';

const removeComments = (str) => {
    if (str) {
        str = str.replace(/\/\*.*\*\//g, '');
        return str;
    } else {
        console.error('removeComments: ', str);
    }
};

module.exports = removeComments;
