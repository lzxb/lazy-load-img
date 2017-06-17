import testMeet from './lib/testMeet'
import getTransparent from './lib/get-transparent'
const _win = window

class LazyLoadImg {
  // 构造函数 初始化参数
  constructor (options = {}) {
    this.options = {
      el: document.querySelector('body'), // 选择的元素
      mode: 'default', // 默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
      time: 300, // 设置一个检测时间间隔
      done: true, // 页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁：FALSE应用场景：页面异步不断获取数据的情况下 需要实时监听则不销毁
      diy: { // 此属性，只有在设置diy 模式时才生效
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      },
      position: { // 只要其中一个位置符合条件，都会触发加载机制
        top: 0, // 元素距离顶部
        right: 0, // 元素距离右边
        bottom: 0, // 元素距离下面
        left: 0 // 元素距离左边
      },
      before (el) { // 图片加载之前，执行钩子函数

      },
      success (el) { // 图片加载成功，执行钩子函数

      },
      error (el) { // 图片加载失败，执行的钩子函数

      }
    }
    // 深拷贝 如果都有 则右面的值 option.position会覆盖this.options.position
    options.position = Object.assign({}, this.options.position, options.position)
    options.diy = Object.assign({}, this.options.diy, options.diy)
    Object.assign(this.options, options)
    this.start()
  }
  start () {
    this._timer = true
    this._start()
  }
  _start () {
    var { options } = this
    clearTimeout(this._timer) // 清除定时器
    if (!this._timer) return
    this._timer = setTimeout(() => {
      var list = Array.prototype.slice.apply(options.el.querySelectorAll('[data-src]'))
      if (!list.length && options.done) return clearTimeout(this._timer)
      list.forEach((el) => {
        if (!el.dataset.LazyLoadImgState && testMeet(el, options.position)) {
          this.loadImg(el)
        }
      })
      this._start()
    }, options.time)
  }
  loadImg (el) { // 加载图片
    var { options } = this
    el.dataset.LazyLoadImgState = 'start'
    options.before.call(this, el)
    var img = new _win.Image()
    img.src = el.dataset.src
    // 图片加载成功
    img.addEventListener('load', () => {
      if (options.mode === 'diy') {
        el.src = getTransparent(el.src, el.width, el.height)
        options.diy.backgroundImage = 'url(' + img.src + ')'
        Object.assign(el.style, options.diy)
      } else {
        el.src = img.src
      }
      delete el.dataset.src
      delete el.dataset.LazyLoadImgState
      return options.success.call(this, el)
    }, false)

    // 图片加载失败
    img.addEventListener('error', () => {
      delete el.dataset.src
      delete el.dataset.LazyLoadImgState
      options.error.call(this, el)
    }, false)
  }
  destroy () { // 解除事件绑定
    delete this._timer
  }
}
export default LazyLoadImg
