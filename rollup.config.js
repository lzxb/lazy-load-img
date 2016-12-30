const path = require('path')
const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')

module.exports = {
    entry: 'src/index.js',
    moduleName: 'LazyLoadImg',
    format: 'umd',
    dest: 'dist/lazy-load-img.js',
    plugins: [
        babel()
    ]
}