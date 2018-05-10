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
            <div class="title-box">
                <!-- title -->
            </div>
            <div class="heb-pic">
                <!-- form -->
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="btn heb-tips hide"></div>

    <script src="bundle/jquery.min.js"></script>
    <script src="bundle/clipboard.min.js"></script>
    <script src="bundle/index.js"></script>
    
  </body>
</html>`;
};

module.exports = index;
