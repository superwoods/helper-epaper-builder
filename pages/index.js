// const footer = require('./footer');
const index = (files) => {
    // console.log('page/index.js', files);
    const renderDom = (files) => {
        let result = '';
        const hasSrc = files.length > 0;
        if (hasSrc) {
            const domFn = (file) => {
                const path = file.path.replace('public/', '');
                return `
                    <a href="/${path}" target="_black">
                        <img src="/${path}" width="951" />
                    </a>
                `;
            };
            files.map((file, i) => {
                result += domFn(file);
            });
        } else {
            result = `has not img! len: ${files.length}`;
        }
        return result;
    };

    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HEB</title>
    <script src="bundle/browser.min.js"></script>
    <link rel="stylesheet" href="bundle/index.css">
  </head>
  <body>
    <div class="heb-box">
      <div class="heb-box-in">
        <div class="heb-main-box">
          <div class="heb-main">
            <div class="title-box">
                <!-- title -->
            </div>
            <div class="heb-pic">
                <!-- form -->
            </div>
        </div>
      </div>
    </div>

    <script src="bundle/jquery.min.js"></script>
    <script src="bundle/index.js"></script>
  </body>
</html>`;
};

module.exports = index;
