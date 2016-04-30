/*
    version: 2.0.0
    date: 2016-04-30
    author: 狼族小狈
    github：https://github.com/1340641314/fors
*/
!(function (LazyloadImg) {
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function () {
            return LazyloadImg;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = LazyloadImg;
    } else {
        window.LazyloadImg = LazyloadImg;
    }
})(function (myset) {
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

        this.load = function (el) {}; //加载成功后回调方法
        this.error = function (el) {}; //加载失败后回调方法
        this.qriginal = false; //是否将图片处理成正方形,true处理成正方形，false不处理
        this.transparent = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEklEQVR42mP4//8/AzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC'; //透明的图片

        for (var key in myset) { //覆盖配置
            this[key] = myset[key];
        }
        this.init();
    };

    /**
     * 初始化
     */
    LazyloadImg.prototype.init = function () {

        //初始化样式
        this.createStyle();
        //src属性值
        var _this = this;
        this.src = (function () {
            return /\[data-([a-z]+)\]$/.exec(_this.el)[1] || 'src';
        })();
        //事件绑定
        var eventList = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll'];
        for (var i = 0; i < eventList.length; i++) {
            document.addEventListener(eventList[i], this.eachDOM.bind(this), false);
        }

    };

    /**
     * 创建插件所需样式
     */
    LazyloadImg.prototype.createStyle = function () {
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
     * 遍历DOM元素
     */
    LazyloadImg.prototype.eachDOM = function () {
        var list = document.querySelectorAll(this.el);
        var trueList = [];
        for (var i = 0; i < list.length; i++) {
            if (this.testMeet(list[i]) === true) {
                trueList.push(list[i]);
            }

        }

        for (var i = 0; i < trueList.length; i++) {
            this.loadImg(trueList[i]);
        }

    };

    /**
     * 检测元素是否在可视区
     * @param {object} el 检测的元素
     */
    LazyloadImg.prototype.testMeet = function (el) {
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
    LazyloadImg.prototype.loadImg = function (el) {
        var _this = this;
        var src = el.dataset[this.src];
        var img = new Image();
        img.src = src;

        img.addEventListener('load', function () {

            if (_this.qriginal) {
                el.style.width = el.width + 'px';
                el.style.height = el.height + 'px';
                el.src = _this.transparent;
                el.className += ' LazyloadImg-qriginal';
                el.style.backgroundImage = 'url(' + img.src + ')';
            } else {
                el.src = img.src;
            }

            delete el.dataset[_this.src];
            return _this.load.call(_this, el);
        }, false);
        img.addEventListener('error', function () {
            return _this.error.call(_this, el);
        }, false);
    };

    return new LazyloadImg(myset);

});