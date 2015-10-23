# SeeDownloadImg

这是一个不依赖第三方库的插件，采用原生js开发，适用于大量加载图片的页面，将给img标签的src放一张默认的图片，
等用户看到这张图片的时候，再去读取真实的图片渲染给用户看，能够加快页面相应速度，减轻服务器压力。插件非常小，未压缩也只有2.5kb。


例子：
&lt;script type="text/javascript"&gt;
new SeeDownloadImg('[data-lz-src]', {
	top: 10, //元素在顶部伸出的高度
	bottom: 10, //元素在底部伸出的高度
	updateTag: true, //页面滚动后是否更新标签，比如ajax插入新的数据，需要重新更新标签
	fnLoadImg: function (obj) { //图片加载完成后执行方法，根据此api可以在图片加载完成后实现css3动画渲染等
		obj.style.cssText = '-webkit-animation: fadeIn 0.5s ease 0.2s 1 both;animation: fadeIn 0.8s ease 0.2s 1 both;';
	}
});
&lt;/script&gt;

img标签例子：
 &lt;img data-lz-src="真实的图片地址" src="默认图片地址"&gt;
