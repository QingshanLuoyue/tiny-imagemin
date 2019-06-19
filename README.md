# tiny-imagemin
支持 tiny 和 imagemin 压缩图片

# install

```javascript
npm install -D tiny-imagemin
```

# usage

```javascript
const zegoImagemin = require('tiny-imagemin')
const path = require('path')

let srcUrl = path.resolve(__dirname, '../src/assets/common')
let distUrl = path.resolve(__dirname, '../src/assets/n')

// 使用 tiny 进行 jpg 和 png 图片压缩

zegoImagemin(srcUrl, distUrl, {
    // onlyDir: 'dist/img',
    // key: '',
    imageminConfig: true,
    cache: false
})
```

# params
调用
```javascript
zegoImagemin(srcUrl, distUrl, options)
```

params
```javascript
srcUrl: 需要压缩的原地址--- 是绝对路径
```

```javascript
distUrl: 压缩完成后的目标地址 --- 是绝对路径
```

```javascript
options:
    onlyDir: String 如果设置了，则图片都解析到该目录，否则默认原先是什么目录，解析完的目录一样
    key: String  tiny 提供的 apikey，用来调用tiny 的压缩 api 进行压缩，需要去官网申请，每月免费 500 次调用 ，超过收费
    cache: Boolean  是否启用缓存，压缩过的不再压缩，从缓存中取
    imageminConfig Boolean || Object  gulp-imagemin 的配置项，设置了即启动 imagemin 压缩，不设置默认启动 tiny 压缩
```


# methods

```javascript
// 清除之前设置的图片缓存
zegoImagemin.clearCache()
```