const downDomClean = (dom) => {
    let r = dom
        // .replace(/\/upload\/pic\-\d*\-([\s\S]*?)/gi, '$1')
        .replace(/<span class="add-href-input[\s\S]*?<\/span>?[\s\S]*?<\/span>(<\/span>)?/gim, '');
    return r;
};