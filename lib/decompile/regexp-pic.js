'use strict';
/*
igm:
    <Picture needcode=0>PictureUrlPh</Picture>
    <Picture needcode=0 >PictureUrlPh</Picture>
    <Picture needcode=0
    >PictureUrlPh</Picture>
*/

module.exports = /<Picture needcode="?(\d*)"?[\s\S]*?>(\s*|\S*)?PictureUrlPh(\s*|\S*)?<\/Picture>/igm;
