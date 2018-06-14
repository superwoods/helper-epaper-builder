const downDomClean = (dom) => {
    return (dom
        .replace(/\/upload\/pic\-\d*\-([\s\S]*?)/gi, '$1')
        .replace(/<span class="add-href-input[\s\S]*?<\/span>[\s\S]*?<\/span>[\s\S]*?<\/span>/gim, ''));
};