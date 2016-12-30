import testMeet from './lib/testMeet'
import getTransparent from './lib/get-transparent'
const _win = window

class LazyLoadImg {
    constructor(options) {

        this.options = {
            el: null, //选择的元素
            mode: 'default', //默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
            diy: { //此属性，只有在设置diy 模式时才生效
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
            before() { // 图片加载之前，执行钩子函数

            },
            success() { // 图片加载成功，执行钩子函数

            },
            error() { // 图片加载失败，执行的钩子函数

            }
        }

        this.eventListener = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll']



        this.filters = () => { //过滤元素，符合条件的加载
            var list = Array.prototype.slice.apply(this.options.el.querySelectorAll('[data-src]'))
            list.forEach((el) => {
                if (!el.dataset.LazyLoadImgState && testMeet(el)) {
                    this.loadImg(el)
                }
            })
        }
        Object.assign(this.options.position, options.position)
        Object.assign(this.options.diy, options.diy)
        Object.assign(this.options, options)
        this.start()
        const timer = setTimeout(() => { //异步执行
            this.filters() //实例化后，手动触发一次
            clearTimeout(timer)
        }, 0)
    }
    start() { //绑定事件
        this.eventListener.forEach((name) => _win.addEventListener(name, this.filters, false))
    }
    loadImg(el) { //加载图片
        var { options } = this
        el.dataset.LazyLoadImgState = 'start'
        options.before.call(this, el)
        var img = new Image()
        img.src = el.dataset.src

        img.addEventListener('load', () => {

            if (options.mode == 'diy') {
                el.src = getTransparent(el.src, el.width, el.height)
                Object.assign(el.style, options.diy)
                el.style.backgroundImage = 'url(' + img.src + ')'
            } else {
                el.src = img.src
            }
            delete el.dataset.src
            el.dataset.LazyLoadImgState = 'success'
            return options.success.call(this, el)
        }, false)

        img.addEventListener('error', () => {
            el.dataset.LazyLoadImgState = 'error'
            options.error.call(this, el)
        }, false)
    }
    destroy() { //解除事件绑定
        this.eventListener.forEach((name) => _win.removeEventListener(name, this.filters, false))
    }
}

export default LazyLoadImg