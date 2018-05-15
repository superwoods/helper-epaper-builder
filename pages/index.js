const index = () => {
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
            <div class="title-box"></div>
            <!-- 主内容位置 START -->
            <div class="heb-pic"></div>
            <!-- 主内容位置 END -->

            <div class="btn heb-tips hide">
              <!-- 完成 copy 提示文字 -->
            </div>

          </div>
        </div>
      </div>
    </div>

    <script src="bundle/jquery.min.js"></script>
    <script src="bundle/clipboard.min.js"></script>
    <script src="bundle/index.js"></script>
    
  </body>
</html>`;
};

module.exports = index;
