
 [![npm](https://img.shields.io/npm/v/lazy-load-img.svg?style=flat-square)](https://www.npmjs.com/package/lazy-load-img) [![npm](https://img.shields.io/npm/dt/lazy-load-img.svg?style=flat-square)](https://www.npmjs.com/package/lazy-load-img) [![npm](https://img.shields.io/npm/l/lazy-load-img.svg?style=flat-square)](https://www.npmjs.com/package/flex.css)


### 安装
```
  npm install lazy-load-img --save
```

### 优势
```
1.原生js开发，不依赖任何框架或库
2.支持将各种宽高不一致的图片，自动剪切成默认图片的宽高
  比如说你的默认图片是一张正方形的图片，则各种宽度高度不一样的图片，自动剪切成正方形。
  完美解决移动端开发中，用户上传图片宽高不一致而导致的图片变形的问题。<br>
3.简洁的API，让你分分钟入门！！！
```
### 快速入门
```javascript
    var lazyloadImg = new LazyloadImg({
        el: '#ul [data-src]', //匹配元素
        top: 50, //元素在顶部伸出长度触发加载机制
        right: 50, //元素在右边伸出长度触发加载机制
        bottom: 50, //元素在底部伸出长度触发加载机制
        left: 50, //元素在左边伸出长度触发加载机制
        qriginal: false, // true，自动将图片剪切成默认图片的宽高；false显示图片真实宽高
        before: function (el) { //图片开始加载前执行的回调方法，传入一个参数，即元素本身
        },
        load: function(el) { //图片加载成功后执行的回调方法，传入一个参数,即元素本身
            el.style.cssText += '-webkit-animation: fadeIn 01s ease 0.2s 1 both;animation: fadeIn 1s ease 0.2s 1 both;';
        },
        error: function(el) { //图片加载失败后执行的回调方法，传入一个参数，即元素本身

        }
    });
    //结束图片懒加载事件监听：lazyloadImg.end();
    //开始图片懒加载事件监听：lazyloadImg.start();
```
### api
```javascript
    lazyloadImg.start(); //开始启动程序，会绑定相关的事件，并且来检测符合加载条件的元素
    lazyloadImg.end(); //结束程序，会解除绑定所有的相关事件，释放内存
    lazyloadImg.eachDOM(); //检测匹配的元素，符合条件的，会立即加载
    lazyloadImg.testMeet(el); //检测元素是否在可视区，传入一个参数，即元素对象
    lazyloadImg.loadImg(el); //加载图片，传入一个参数，即img元素对象
    lazyloadImg.getTransparent(src, width, height); //生成一张透明的图片，参数分别是：图片地址，宽度，高度
```
### demo
 [![demo](https://github.com/lzxb/lazy-load-img/raw/master/shot/index.png)](http://lzxb.github.io/lazy-load-img/)
### demo2 将各种宽高不一的图标剪切成默认图片的尺寸大小
 [![demo](https://github.com/lzxb/lazy-load-img/raw/master/shot/index2.png)](http://lzxb.github.io/lazy-load-img/index2.html)
