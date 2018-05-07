// const footer = require('./footer');
const domFn = (file) => `
<a href="/${file.path}" target="_black">/${file.path}</a>

`;

const renderDom = (files) => {
    let reslut = '';
    const hasSrc = files.length > 0;
    if (hasSrc) {
        files.map((file, i) => {
            result += domFn(file);
        });
    } else {
        reslut = `has not img! len: ${files.length}`;
    }
    return reslut;
};

const index = (files) => {
    // console.log('pages/index.js: ', err);
    // global.HELP_CMS.uploadOrgFileType = null;
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>HEB</title>
    <script src="http://www.xiongan.gov.cn/bundle/jq.js"></script>
    <script src="http://www.xiongan.gov.cn/bundle/browser.min.js"></script>
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
            <hr>
            
            <form action="/upload" method="post" enctype="multipart/form-data">
              <h2>多图上传</h2>
              
              form pages/index.js !!!<br>

              <input type="file" name="pic">
              <input type="file" name="pic">
              <input type="submit" value="提交">
            </form>

            
            ${files ? renderDom(files) : 'err: no files!'}

          </div>
        </div>
      </div>
    </div>
    <iframe class="heb-bg-iframe" src="http://www.xiongan.gov.cn/2018-04/16/c_129851439.htm" frameborder="0"></iframe>
    <script src="bundle/index.js"></script>
  </body>
</html>
`;
};

module.exports = index;
