/*
	var obj = {
		name: '狼族小狈',
		QQ: 1340641314,
		github: 'https://github.com/1340641314/SeeDownloadImg',
		statement: '在保留头部版权的情况下，可以自由发布修改，应用于商业用途',
		version: '1.0.0',
		update: '2015-10-23'
	};
*/

(function () {
	
	var SeeDownloadImg = function (query, config) {
		this.config = {
			top: 10, //元素在顶部伸出的高度
			bottom: 10, //元素在底部伸出的高度
			updateTag: false, //循环结束后，是否自动更新标签，true为更新，false不更新
			fnLoadImg: function () {} //真实图片加载成功后执行
		};
		this.query = query? query : '[data-lz-src]'; //选择器
		this.tag = null; //存储标签
		
		for (attr in config) { //更新配置
			this.config[attr] = config[attr];
		}
		
		this.init();
	};
	
	SeeDownloadImg.prototype = {
		init: function () {
			var _this = this;
			
			window.addEventListener('load', function () {
				_this.getTag();
				_this.each();
			}, false);
			
			window.addEventListener('scroll', function () {
				_this.each();
				if (_this.config.updateTag) { //更新标签
					_this.getTag();
				}
				
			}, false);
		},
		getTag: function () { //更新标签
			this.tag = document.querySelectorAll(this.config.query);
			this.tag = Array.prototype.slice.call(this.tag);
		},
		each: function () { //循环标签

			for (var i=0;i<this.tag.length;i++) {
				
				if (this.tsetTap(this.tag[i])) {

					this.loadImg(this.tag[i]);
					delete this.tag[i].dataset.lzSrc;
					this.tag.splice(i,1);
					i--;
				}
				
			};
		},
		tsetTap: function (obj) { //判断元素是否加载条件
			var iObjHeight = obj.offsetHeight; //元素的高度
			var iWinHeight = document.documentElement.clientHeight; //可视区的高度
			
			var iDistanceTop = (obj.getBoundingClientRect().top + iObjHeight); //元素在顶部伸出的高度
			var iDistanceBottom = ((iWinHeight + iObjHeight) - obj.getBoundingClientRect().bottom); //元素在底部伸出的高度

			var bool = iDistanceTop >= this.config.top && iDistanceBottom >= this.config.bottom;
			return bool;
	
		},
		loadImg: function (oImg) { //将图片渲染为真实的地址
		
			var _this = this;
			var oImgObj = new Image();
			oImgObj.src = oImg.dataset.lzSrc;

			oImgObj.addEventListener('load', function () {
				oImg.src = oImgObj.src;
				_this.config.fnLoadImg(oImg);
			},false);
			
		}
	};
	window.SeeDownloadImg = SeeDownloadImg;
})();