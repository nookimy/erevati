var gulp      = require('gulp'), // Подключаем Gulp
    less        = require('gulp-less'), //Подключаем less пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('less', function(){ // Создаем таск less
    return gulp.src('app/less/**/*.less') // Берем источник
        .pipe(less()) // Преобразуем less в CSS посредством gulp-less
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['less', 'browser-sync'], function() {
    gulp.watch('app/less/**/*.less', ['less']); // Наблюдение за less файлами в папке less
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], browserSync.reload); // Наблюдение за главным JS файлом и за библиотеками
});