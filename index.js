const gulp = require('gulp')
const tingpng = require('gulp-tinypng')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const fs = require('fs')
const stat = fs.stat

// 使用 tiny 进行 jpg 和 png 图片压缩
/**
 * 
 * @param {String} src 需要压缩的原地址--- 是绝对路径
 * @param {String} dist  压缩完成后的目标地址 --- 是绝对路径
 * @param {Object} options 配置项
 *  onlyDir: String 如果设置了，则图片都解析到该目录，否则默认原先是什么目录，解析完的目录一样
 *  key: String  tiny 提供的 apikey，用来调用tiny 的压缩 api 进行压缩，需要去官网申请，每月免费 500 次调用 ，超过收费
 *  cache: Boolean  是否启用缓存，压缩过的不再压缩，从缓存中取
 *  imageminConfig Object || Boolean  gulp-imagemin 的配置项，设置了即启动 imagemin 压缩，不设置默认启动 tiny 压缩
 */
function parse(src, dist, options) {
  fs.readdir(src, { encoding: 'utf-8' }, (err, filePaths) => {
    console.log('filePaths :', filePaths)

    filePaths.forEach(filePath => {
      let _src = src + '/' + filePath
      let _dist = dist + '/' + filePath
      // console.log('currentUrl :', _src)
      
      stat(_src, (err, stats) => {
        if (stats.isFile()) {
          console.log('filePath :', filePath)
          if (options.onlyDir) { // 解析到同一个文件夹
            innerDist = options.onlyDir
          } else {
            innerDist = dist
          }
          
          let srcStream = null
          srcStream = gulp.src(_src)
          // 启用缓存
          if (options.cache) {
            if (options.imageminConfig) {
              options.imageminConfig = typeof options.imageminConfig === 'object' ? options.imageminConfig : {}
              // 启用 gulp-imagemin 插件
              srcStream = srcStream.pipe(cache(imagemin(options.imageminConfig)))              
            } else {
              // 启用 tiny
              srcStream = srcStream.pipe(cache(tingpng(options.key)))
            }

          } else {
            if (options.imageminConfig) {
              options.imageminConfig = typeof options.imageminConfig === 'object' ? options.imageminConfig : {}
              srcStream = srcStream.pipe(imagemin(options.imageminConfig))
            } else {
              srcStream = srcStream.pipe(tingpng(options.key))
            }
          }
          // 生成
          srcStream.pipe(gulp.dest(innerDist))                 
        } else if (stats.isDirectory()) {
          console.log('directory :', filePath)
          parse(_src, _dist, options)
        }
      })
    })
  })
}
parse.clearCache = function() {
  cache.clearAll()
}
module.exports = parse