/*!
    version: 2.0.6
    date: 2016-06-16
    author: 狼族小狈
    github：https://github.com/lzxb/lazyloadImg
*/
!(function (LazyloadImg) {
    'use strict';
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(LazyloadImg);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = LazyloadImg();
    } else {
        window.LazyloadImg = LazyloadImg();
    }
})(function () {
    'use strict';

    /**
     * 构建对象
     */
    function LazyloadImg(myset) {

        this.el = '[data-src]'; //元素选择器
        /*
            元素在可视区位置，符合其中一个条件就会触发加载机制
        */
        this.top = 0; //元素在顶部伸出的距离才加载
        this.right = 0; //元素在右边伸出的距离才加载
        this.bottom = 0; //元素在底部伸出的距离才加载
        this.left = 0; //元素在左边伸出的距离才加载

        this.before = () => { }; //加载之前执行方法
        this.load = (el) => { }; //加载成功后回调方法
        this.error = (el) => { }; //加载失败后回调方法
        this.qriginal = false; //是否将图片处理成正方形,true处理成正方形，false不处理

        //监听的事件列表
        this.monitorEvent = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll'];

        for (let key in myset) { //覆盖配置
            this[key] = myset[key];
        }

        /**
         * 初始化
         */
        this.init = () => {

            //初始化样式
            this.createStyle();
            //src属性值
            this.src = (() => {
                return /\[data-([a-z]+)\]$/.exec(this.el)[1] || 'src';
            })();

            this.start();
        };

        /**
         * 创建插件所需样式
         */
        this.createStyle = () => {
            var style = document.getElementById('LazyloadImg-style');
            if (style) {
                return false; //已经创建了样式
            }
            style = document.createElement('style');
            style.id = 'LazyloadImg-style';
            style.type = 'text/css';
            style.innerHTML = '\
                .LazyloadImg-qriginal {\
                    -webkit-transition: none!important;\
                    -moz-transition: none!important;\
                    -o-transition: none!important;\
                    transition: none!important;\
                    background-size: cover!important;\
                    background-position: center center!important;\
                    background-repeat: no-repeat!important;\
                }\
            ';
            document.querySelector('head').appendChild(style);
        };
        /**
         * 开始
         */
        this.start = () => {
            var eventList = this.monitorEvent;

            for (let i = 0; i < eventList.length; i++) {
                window.addEventListener(eventList[i], this.eachDOM, false);
            }
            this.eachDOM();
        };
        /**
         * 遍历DOM元素
         */
        this.eachDOM = () => {
            var list = document.querySelectorAll(this.el);
            var trueList = [];
            for (let i = 0; i < list.length; i++) {
                if (this.testMeet(list[i]) === true) {
                    trueList.push(list[i]);
                }

            }

            for (let i = 0; i < trueList.length; i++) {
                this.loadImg(trueList[i]);
            }

        };
        /**
         * 检测元素是否在可视区
         * @param {object} el 检测的元素
         */
        this.testMeet = (el) => {
            var bcr = el.getBoundingClientRect(); //取得元素在可视区的位置

            var mw = el.offsetWidth; //元素自身宽度
            var mh = el.offsetHeight; //元素自身的高度
            var w = window.innerWidth; //视窗的宽度
            var h = window.innerHeight; //视窗的高度
            var boolX = (!((bcr.right - this.left) <= 0 && ((bcr.left + mw) - this.left) <= 0) && !((bcr.left + this.right) >= w && (bcr.right + this.right) >= (mw + w))); //上下符合条件
            var boolY = (!((bcr.bottom - this.top) <= 0 && ((bcr.top + mh) - this.top) <= 0) && !((bcr.top + this.bottom) >= h && (bcr.bottom + this.bottom) >= (mh + h))); //上下符合条件
            if (el.width != 0 && el.height != 0 && boolX && boolY) {
                return true;
            } else {
                return false;
            }
        };
        /**
         * 加载图片
         * @param {object} el 要加载图片的元素
         */
        this.loadImg = (el) => {
            var src = el.dataset[this.src];
            var img = new Image();
            img.src = src;

            this.before.call(this, el);
            img.addEventListener('load', () => {

                if (this.qriginal) {
                    el.src = this.getTransparent(el.src, el.width, el.height);
                    el.className += ' LazyloadImg-qriginal';
                    el.style.backgroundImage = 'url(' + img.src + ')';
                } else {
                    el.src = img.src;
                }
                delete el.dataset[this.src];
                return this.load.call(this, el);
            }, false);
            img.addEventListener('error', () => {
                return this.error.call(this, el);
            }, false);
        };
        /**
         * 获取透明的图片
         */
        this.getTransparent = (() => {
            var canvas = document.createElement('canvas');
            canvas.getContext('2d').globalAlpha = 0.0;
            var images = {};

            return (src, w, h) => {
                if (images[src]) return images[src]; //已经同样路径的已经生成过，无需重复生成浪费资源
                canvas.width = w;
                canvas.height = h;
                var data = canvas.toDataURL('image/png');
                images[src] = data;
                return data;
            };

        })();
        /**
         * 卸载插件
         */
        this.end = () => {
            var eventList = this.monitorEvent;
            for (let i = 0; i < eventList.length; i++) {
                window.removeEventListener(eventList[i], this.eachDOM, false);
            }
        };
        this.init();
    };

    return LazyloadImg;

});
