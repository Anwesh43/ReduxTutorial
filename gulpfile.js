var gulp = require('gulp')
var browserify = require('browserify')
var livereload = require('gulp-livereload')
gulp.task('compileES6ForPublic',()=>{
  return browserify('task.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('public/bundle.js'))
})
gulp.task('compileES6ForExample',()=>{
  return browserify('index.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('example/bundle.js'))
})
gulp.task('watchForChange',()=>{
    gulp.watch('*.js',['compileES6ForExample','compileES6ForPublic'])
})
