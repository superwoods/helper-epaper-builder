'use strict';

const getClass = ($tag) => {
    const className = $tag.attr('class');
    return className && className.length > 0 ? ` class="${className}"` : '';
};

module.exports = getClass;
