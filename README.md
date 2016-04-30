# lazyload

<h2>轻量级的移动端图片懒加载插件</h2>
原生js开发，不依赖任何框架或库<br>
2.0特性：支持将图片剪切成默认图片的宽高，完美解决用户上传图片宽高不一致的痛点。

<h3>快速入门</h3>
<pre>
     new Lazyload({
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
