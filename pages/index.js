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

    // console.log('pages/index.js: ', err);
    // global.HELP_CMS.uploadOrgFileType = null;
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
                <div class="title">《今日雄安》</div>
                <div class="year">
                    <div class="i" contenteditable="true">2018</div>年
                </div>
                <div class="month">
                    <div class="i" contenteditable="true">12</div>月
                </div>
                <div class="day">
                    <div class="i" contenteditable="true">18</div>日
                </div>
                <div class="stage">第
                    <div class="i" contenteditable="true">22</div>期
                </div>
                <div class="i add-title" contenteditable="true"></div>
            </div>
            <div class="heb-pic">
                
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
