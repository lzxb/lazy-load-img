const path = require('path')
const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

module.exports = {
    entry: 'src/index.js',
    moduleName: 'LazyLoadImg',
    format: 'umd',
    dest: 'dist/lazy-load-img.min.js',
    plugins: [
        babel(),
        uglify(),
    ],
    // sourceMap: 'inline'
}