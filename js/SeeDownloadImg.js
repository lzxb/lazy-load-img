/*
	var obj = {
		name: '狼族小狈',
		QQ: 1340641314,
		github: 'https://github.com/1340641314/SeeDownloadImg',
		statement: '在保留头部版权的情况下，可以自由发布修改，应用于商业用途',
		version: '2.0.0',
		update: '2015-11-12'
	};
*/
(function () {
	
	function SeeDownloadImg (setting){
		
		this.selector = '[data-lz-src]'; //选择器
		this.iTop = setting.iTop || 0;         //元素在顶部伸出的距离才加载
		this.iBottom = setting.iBottom || 0;      //元素在底部伸出的距离才加载
		this.fLoadImg = setting.fLoadImg || function (oImg){}; //图片加载完成后执行方法
		this.aElements = [];   //存储元素
		this.status = true;    //检测状态值
		
		this.init();
	}
	SeeDownloadImg.prototype.init = function () {
		var _this = this;
		if (!this.initStatus) window.addEventListener('load',function () {
			
			_this.getElements(); //获取元素
			_this.each();
		}, false);
		
		window.addEventListener('scroll', function () {
			
			if (_this.status) {
				_this.each();
			} else {
				_this.getElements();
			}
		}, false);
	}
	SeeDownloadImg.prototype.getElements = function () {
		
		var aTag = document.querySelectorAll(this.selector);
		
		for (var i=0;i<aTag.length;i++) {
            var json ={};
            json.tag = aTag[i];
            json.src = aTag[i].dataset.lzSrc;
            delete aTag[i].dataset.lzSrc;
            
            this.aElements.push(json);
		}
	}
    SeeDownloadImg.prototype.each = function () {
        this.status = false;
        var aElements = this.aElements;

        for (var i=0;i<aElements.length;i++) {

            if (this.testMeet(aElements[i].tag)) {
				this.loadImg(aElements[i].tag, aElements[i].src);
				aElements.splice(i,1);
				i--;
            } 
            
        }
		this.status = true; //做缓处理，避免因为用户滑动过快导致的内存上涨
    }
    SeeDownloadImg.prototype.testMeet = function (obj) {

			var iObjHeight = obj.offsetHeight; //元素的高度
			var iWinHeight = document.documentElement.clientHeight; //可视区的高度
			
			var iDistanceTop = (obj.getBoundingClientRect().top + iObjHeight); //元素在顶部伸出的高度
			var iDistanceBottom = ((iWinHeight + iObjHeight) - obj.getBoundingClientRect().bottom); //元素在底部伸出的高度

			var bool = iDistanceTop >= this.iTop && iDistanceBottom >= this.iBottom;

			return bool;
    }
	SeeDownloadImg.prototype.loadImg = function (oImg, url) {
		
			var _this = this;
			var oImgObj = new Image();
			oImgObj.src = url;

			oImgObj.addEventListener('load', function () {
				oImg.src = oImgObj.src;
				_this.fLoadImg(oImg);
			},false);
	}
	
	window.SeeDownloadImg = SeeDownloadImg;
})();

