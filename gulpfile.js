var gulp = require('gulp')
var browserify = require('browserify')
var livereload = require('gulp-livereload')
gulp.task('compileES6ForPublic',()=>{
  return browserify('task.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('public/bundle.js'))
})
gulp.task('compileES6ForExample',()=>{
  return browserify('index.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('example/bundle.js'))
})
gulp.task('compileES6ForChat',()=>{
  return browserify('ChatLikeDiv.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('chat/bundle.js'))
})
gulp.task('compileES6ForQuoteCircle',()=>{
  return browserify('CircleQuotesBox.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('quotesincircle/bundle.js'))
})
gulp.task('compileES6ForBlockComponent',()=>{
  return browserify('GameComponent.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('movingballs/bundle.js'))
})
gulp.task('compileForDrawingApp',()=>{
    return browserify('DrawingComponent.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('drawingApp/bundle.js'))
})
gulp.task('compileForAnimatedCirc',()=>{
    browserify('CircleContainerComponents.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('circs/bundle.js'))
})
gulp.task('compileForStoreImpl',()=>{
    browserify('store_impl_test.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('test/bundle.js'))
})
gulp.task('watchForChange',()=>{
    gulp.watch('*.js',['compileES6ForExample','compileES6ForPublic'])
})
