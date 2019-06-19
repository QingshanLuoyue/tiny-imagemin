const zegoImagemin = require('../index')
const path = require('path')

let rootUrl = path.resolve(__dirname, '../src/assets/common')
let distUrl = path.resolve(__dirname, '../src/assets/n')

// zegoImagemin.clearCache()
zegoImagemin(rootUrl, distUrl, {
    // onlyDir: 'dist/img',
    // key: '',
    imageminConfig: true
})