# LazyloadImg

<h2>轻量级的移动端图片懒加载插件</h2>
原生js开发，不依赖任何框架或库<br>
支持将各种宽高不一致的图片，自动剪切成默认图片的宽高。比如说你的默认图片是一张正方形的图片，则各种宽度高度不一样的图片，自动剪切成正方形。<br>
完美解决移动端开发中，用户上传图片宽高不一致而导致的图片变形的问题。<br>
简洁的API，让你分分钟入门！！！

<h3>快速入门</h3>
<pre>
     new LazyloadImg({
        el: '[data-src]', //匹配元素
        top: 50, //元素在顶部伸出长度触发加载机制
        right: 50, //元素在右边伸出长度触发加载机制
        bottom: 50, //元素在底部伸出长度触发加载机制
        left: 50, //元素在左边伸出长度触发加载机制
        qriginal: false, // true，自动将图片剪切成默认图片的宽高；false显示图片真实宽高
        load: function (el) { //图片加载成功后执行的回调方法，传入一个参数
            el.style.cssText += '-webkit-animation: fadeIn 01s ease 0.2s 1 both;animation: fadeIn 1s ease 0.2s 1 both;';
        },
        error: function (el) { //图片加载失败后执行的回调方法

        }
    });
</pre>
