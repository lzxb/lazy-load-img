
 [![npm](https://img.shields.io/npm/v/lazy-load-img.svg?style=flat-square)](https://www.npmjs.com/package/lazy-load-img) [![npm](https://img.shields.io/npm/dt/lazy-load-img.svg?style=flat-square)](https://www.npmjs.com/package/lazy-load-img) 



### 安装
```
  npm install lazy-load-img --save
```

### 优势
```
1.原生js开发，不依赖任何框架或库
2.支持将各种宽高不一致的图片，自动剪切成默认图片的宽高
  比如说你的默认图片是一张正方形的图片，则各种宽度高度不一样的图片，自动剪切成正方形。
  完美解决移动端开发中，用户上传图片宽高不一致而导致的图片变形的问题
3.简洁的API，让你分分钟入门！！！
```


### 默认模式
```javascript
  var lazyLoadImg = new LazyLoadImg({
      el: document.querySelector('#list'),
      mode: 'default', //默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
      time: 300, // 设置一个检测时间间隔
      complete: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
      position: { // 只要其中一个位置符合条件，都会触发加载机制
          top: 0, // 元素距离顶部
          right: 0, // 元素距离右边
          bottom: 0, // 元素距离下面
          left: 0 // 元素距离左边
      },
      before: function () {

      },
      success: function (el) {
          el.classList.add('success')
      },
      error: function (el) {
          el.src = './images/error.png'
      }
  })
  
  // lazyLoadImg.start() // 重新开启懒加载程序
  // lazyLoadImg.destroy() // 销毁图片懒加载程序
```



#### 效果演示
[![demo](https://github.com/lzxb/lazy-load-img/raw/master/shot/mode-default.png)](http://lzxb.github.io/lazy-load-img/examples/mode-default.html)



### 自定义模式
```javascript
  var lazyLoadImg = new LazyLoadImg({
      el: document.querySelector('#list'),
      mode: 'diy', //默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
      time: 300, // 设置一个检测时间间隔
      complete: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
      position: { // 只要其中一个位置符合条件，都会触发加载机制
          top: 0, // 元素距离顶部
          right: 0, // 元素距离右边
          bottom: 0, // 元素距离下面
          left: 0 // 元素距离左边
      },
      diy: { //设置图片剪切规则，diy模式时才有效果
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
      },
      before: function () {

      },
      success: function (el) {
          el.classList.add('success')
      },
      error: function (el) {
          el.src = './images/error.png'
      }
  })

  // lazyLoadImg.start() // 重新开启懒加载程序
  // lazyLoadImg.destroy() // 销毁图片懒加载程序
``` 



#### 效果演示
 [![demo](https://github.com/lzxb/lazy-load-img/raw/master/shot/mode-diy.png)](http://lzxb.github.io/lazy-load-img/examples/mode-diy.html)
