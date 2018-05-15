const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const pagesIndex = require('./pages/index');

global.HEB_CONFIG = {
    filetypes: /jpg|jpeg|png|gif/,
    upload: 'public/upload',
};

const app = express();

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

const createFolder = (folder) => {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

const uploadFolder = `./${global.HEB_CONFIG.upload}/`;

createFolder(uploadFolder);

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const filename = `pic-${timestamp}-${file.originalname}`;
        cb(null, filename);
    }
});

const checkFileType = (file) => {
    const orgType = path.extname(file.originalname).toLowerCase();
    // global.HEB_CONFIG.uploadOrgFileType = orgType;
    const mimetype = global.HEB_CONFIG.filetypes.test(file.mimetype);
    const extname = global.HEB_CONFIG.filetypes.test(orgType);
    const isType = mimetype && extname;
    console.log('checkFileType:', orgType, isType);
    return isType;
};

const fileFilter = (req, file, cb) => {
    if (checkFileType(file) === true) {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
    cb("err: File upload only supports the following filetypes :" + global.HEB_CONFIG.filetypes);
};

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// upload
app.post('/upload-multi', upload.array('pic'), function (req, res, next) {
    const files = req.files;
    console.log('upload files:', files);
    res.json({
        length: files.length,
        files: files
    });
});

app.get('/', function (req, res, next) {
    res.send(pagesIndex());
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
    res.send(pagesIndex());
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
