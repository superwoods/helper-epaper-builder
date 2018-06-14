const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const archiver = require('archiver');
const mkdirp = require('mkdirp');
const multer = require('multer');
const pagesIndex = require('./pages/index');

global.HEB_CONFIG = {
    filetypes: /jpg|jpeg|png|gif/,
    upload: 'public/upload',
    download: 'public/download',
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
    console.log('upload files:\n', files);
    res.json({
        length: files.length,
        files: files
    });
});

// upload
app.post('/upload-txt', upload.single('txt'), function (req, res, next) {
    let txt = req.body.txt;
    let result = {
        hasData: 0,
    };
    if (txt) {
        txt = txt.replace(/\r\n\r\n/igm, '\r\n');
        console.log('----> upload req.body:\n', req.body, '\n----> txt:\n', txt);

        mkdirp(`${global.HEB_CONFIG.download}/`);

        const date = 'index';//Date.now();
        const zipName = `${date}.zip`;
        const zipPath = `./${global.HEB_CONFIG.download}/${zipName}`;

        // set zipPath
        let output = fs.createWriteStream(zipPath);

        var archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function () {
            result.total = archive.pointer();
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function () {
            console.log('Data has been drained');
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });

        // good practice to catch this error explicitly
        archive.on('error', function (err) {
            throw err;
        });

        // pipe archive data to the file
        archive.pipe(output);

        archive.append(txt, {
            'name': `index.html`
        });
        archive.finalize();

        // set result
        result.hasData = 1;
        result.filename = zipName;
        result.path = '/download/' + zipName;
    }
    res.json(result);
});

// download
app.get(`/download/:file`, function (req, res, next) {
    const file = req.params.file;
    // console.log(file);
    res.download(`./${global.HEB_CONFIG.download}/${file}`);
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
