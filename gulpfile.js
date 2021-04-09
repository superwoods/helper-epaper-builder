const del = require('del');
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');
const jsImport = require('gulp-js-import-moo');
// const postcss = require('gulp-postcss');
// const atImport = require('postcss-import');
const header = require('gulp-header');
const dateFormat = require('dateformat');
const pkg = require('./package.json');
const stripDebug = require('gulp-strip-debug');
const usemin = require('gulp-usemin');

// const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
// const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
// const clean = require('gulp-clean');
// const cache = require('gulp-cache');
// const pug = require('gulp-pug');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync').create();
// const reload = browsersync.reload;
const stylus = require('gulp-stylus');
const colors = require('colors');

// 定义需要编译的 js 和 styl
const {
    jsCompiles,
    stylCompiles
} = {
    jsCompiles: [
        'dev/public/js/index.js',
    ],
    stylCompiles: [
        'dev/public/styl/index.styl',
    ],
};


colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

const getTime = (formats) => {
    const now = new Date();
    return dateFormat(now, formats);
};
const now = getTime("yyyy-mm-dd HH:MM:ss");

const banner = `/**
 * Copyright (c) 2017 - ${getTime("yyyy")} www.xiongan.gov.cn All Rights Reserved.
 * Project ${pkg.name} v${pkg.version}
 * @time ${now}
 */
`;
const bannerCSS_charset_utf_8 = `@charset "utf-8";
${banner}`;

gulp.task('usemin: s4', function () {
    gulp
        .src([
            // './index.html',
            // './s1.html',
            // './s2.html',
            // './s3.html',
            // './s4.html',
            // './s5.html',
            // './s6.html',
            // './content.html',
            // './pages.html',
            // './dsj.html',
        ])
        .pipe(usemin(
            {
                // js: [],
                // css: [],
                // css: [rev],
                // html: [function () { return htmlmin({ collapseWhitespace: true }); }],
                // js: [uglify, rev],
                // inlinejs: [uglify],
                // inlinecss: [cleanCss, 'concat']
            }
        ))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist-bundle', function (cb) {
    del([
        // 'dist/bundle/',
        // 'dist/s4/',
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        // 'dist/mobile/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        // '!dist/mobile/deploy.json'
    ], cb);
});

gulp.task('browsersync', function () {
    const baseFiles = [
        'dev/src/*.html',
        'dev/src/bundle/*.gif',
        'dev/src/js/*.js',
        'dev/src/pug/*.pug',
        'dev/src/styl/*.styl',
        'src/src/*.css',
        'src/bundle/*.js',
        'src/bundle/*.png',
        'src/bundle/*.jpg',
    ];
    const _files = baseFiles.concat(jsCompiles, stylCompiles);
    browsersync
        .init(_files, {
            server: {
                baseDir: 'src'
            },
            notify: true,
        });
});

// pug
// gulp.task('pug', function () {
//     gulp
//         .src([
//             'dev/public/pug/index.pug'
//         ])
//         .pipe(plumber())
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(gulp.dest('public'));
// });

// js Compile
let jsCompileTasks = [];

jsCompiles.map((item, index) => {
    const taskTisp = `[${index < 10 ? `0${index}` : index}] jsImport > babel:`;
    const taskName = taskTisp + item;
    jsCompileTasks.push(taskName); //.info + ` ${item}`.data;
    // console.log('jsCompileTasks:'.warn, taskTisp.info, item.data);
    gulp.task(taskName, () => {
        gulp
            .src(item)
            .pipe(jsImport()) // jsImport
            .pipe(gulp.dest('import'))
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            })) //错误处理
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('src/bundle'));
    });
});

console.log('jsCompileTasks:', jsCompileTasks);

gulp.task('styl', function () {
    gulp
        .src(stylCompiles)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(gulp.dest('src/bundle'));
});

// watch
gulp.task('autowatch', function () {
    // gulp.watch('dev/src/pug/*.pug', ['pug']);
    gulp.watch('dev/public/js/*.js', jsCompileTasks);
    gulp.watch('dev/public/styl/*.styl', ['styl']);
});

// 新增添加单独 js 编译的方法
// --------------------------------- config START ---------------------------------
// 控制开启模块
const { isPug, isJs, isStyl } = {
    // isPug: 1,
    isJs: 1,
    isStyl: 1,
};

// 编译目标
const taskNameArray = [
    'print', // index.css, index.js | build: index.min.css, index.min.js,
];
// --------------------------------- config END ---------------------------------

let TASK_js = [];
let TASK_stylus = [];
let TASK_build_js = [];
let TASK_build_css = [];

const tipFn = (i, type) => {
    // `[${i}] type: '${type}' -->`;
    return `[${i}] -->`;
};

const jsTask = ({ file, name, type, index } = {
    file: 'js/',
    name: 'index',
    type: '.js',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;

    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.js': js/index.js

    // TASK_js
    TASK_js.push(taskName);
    console.log('[gulp TASK]'.silly, 'js'.warn, tips.info, src.data);

    gulp.task(taskName, () => {
        gulp
            .src(src)
            .pipe(jsImport())
            .pipe(gulp.dest('import'))
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            }))
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('bundle'));
    });

    // bulid js
    const BUNDLE_src = 'bundle/' + name + type;
    const BUNDLE_taskName = tips + BUNDLE_src; // task [00] '.js': bundle/index.js
    TASK_build_js.push(BUNDLE_taskName);
    console.log('[gulp TASK]'.silly, 'bulid_js'.warn, tips.info, BUNDLE_src.data);

    gulp.task(BUNDLE_taskName, function () {
        gulp
            .src(BUNDLE_src)
            .pipe(stripDebug()) // 删除 console
            .pipe(rename(`${name}.min.js`))
            .pipe(uglify())
            .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });
};

const stylTask = ({ file, name, type, index } = {
    file: 'styl/',
    name: 'index',
    type: '.styl',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;
    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.styl': styl/index.styl

    // 生产批量的 src
    TASK_stylus.push(src);
    console.log('[gulp TASK]'.silly, 'stylus'.warn, tips.info, src.data);


    // bulid css
    const BUNDLE_src = 'bundle/' + name + '.css';
    const BUNDLE_taskName = tips + BUNDLE_src; // task [00] '.js': bundle/index.css
    // TASK_build_css
    TASK_build_css.push(BUNDLE_taskName);
    console.log('[gulp TASK]'.silly, 'build_css'.warn, tips.info, BUNDLE_src.data);

    // build task
    gulp.task(BUNDLE_taskName, function () {
        gulp
            .src(`bundle/${name}.css`)
            .pipe(rename(`${name}.min.css`))
            .pipe(cleancss({
                advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(header(bannerCSS_charset_utf_8))
            // .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });
};

// set tasks
taskNameArray.map((item, index) => {
    if (isJs) {
        jsTask({
            file: 'js/',
            name: item,
            type: '.js',
            index: index,
        });
    }
    if (isStyl) {
        stylTask({
            file: 'styl/',
            name: item,
            type: '.styl',
            index: index,
        });
    }
});

// gulp
gulp.task('default', [
    'autowatch',
    'browsersync'
]);

console.log(now);
