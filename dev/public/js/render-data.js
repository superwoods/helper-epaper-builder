const renderData = (data) => {
    console.log('ajax:', data);
    const files = data.files;

    files.map((e, i) => {
        const src = e.path.replace('public', '');
        const dom = `
            <p>
                <img class="add-herf" src="${src}" width="100%">
            </p>
        `;
        hebContentDom += dom;
        $('.upload-box').replaceWith(`
            ${dom}
            ${uploadBox}
        `);
    });
};
renderData(data);