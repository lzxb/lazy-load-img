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

    function SeeDownloadImg(setting) {

        this.selector = '[data-lz-src]';
        //选择器
        this.iTop = setting.iTop || 0;
        //元素在顶部伸出的距离才加载
        this.iBottom = setting.iBottom || 0;
        //元素在底部伸出的距离才加载
        this.fLoadImg = setting.fLoadImg || function (oImg) {}
        ;
        //图片加载完成后执行方法
        this.aElements = [];
        //存储元素
        this.bStatus = true;
        //检测状态值
        this.bSquare = setting.bSquare || false;
        //是否将图片剪切成正方形

        this.init();
    }
    ;

    SeeDownloadImg.prototype.init = function () {
        var _this = this;
        if (!this.initStatus)
            window.addEventListener('load', function () {
                _this.getElements();
                //获取元素
                _this.each();
            }
            , false);

        window.addEventListener('scroll', function () {

            if (_this.bStatus) {
                _this.each();
            } else {
                _this.getElements();
            }
        }
        , false);

    };

    SeeDownloadImg.prototype.getElements = function () {

        var aTag = document.querySelectorAll(this.selector);

        for (var i = 0; i < aTag.length; i++) {
            var json = {};
            json.tag = aTag[i];
            json.src = aTag[i].dataset.lzSrc;
            delete aTag[i].dataset.lzSrc;

            this.aElements.push(json);
        }

    };

    SeeDownloadImg.prototype.each = function () {
        this.bStatus = false;
        var aElements = this.aElements;

        for (var i = 0; i < aElements.length; i++) {

            if (this.testMeet(aElements[i].tag)) {
                this.loadImg(aElements[i].tag, aElements[i].src);
                aElements.splice(i, 1);
                i--;
            }

        }
        this.bStatus = true;
        //避免本次循环没结束，又开启新的循环
    };

    SeeDownloadImg.prototype.testMeet = function (obj) {

        var iObjHeight = obj.offsetHeight;
        //元素的高度
        var iWinHeight = document.documentElement.clientHeight;
        //可视区的高度

        var iDistanceTop = (obj.getBoundingClientRect().top + iObjHeight);
        //元素在顶部伸出的高度
        var iDistanceBottom = ((iWinHeight + iObjHeight) - obj.getBoundingClientRect().bottom);
        //元素在底部伸出的高度

        var bool = iDistanceTop >= this.iTop && iDistanceBottom >= this.iBottom;

        return bool;
    };

    SeeDownloadImg.prototype.loadImg = function (oImg, url) {

        var _this = this;
        var iWidth = oImg.width;
        //原来默认图片的宽度
        var iHeight = oImg.height;
        //原来默认图片的高度
        var oImgObj = new Image();
        oImgObj.src = url;

        oImg.parentNode.style.overflow = 'hidden';
        //oImg.parentNode.style.position = 'relative';
        oImg.parentNode.style.width = iWidth + 'px';
        oImg.parentNode.style.height = iHeight + 'px';

        oImgObj.addEventListener('load', function () {

            if (_this.bSquare) { //将图片剪切成正方形
                var w2 = 0;
                var h2 = 0;
                //oImg.dataset.info = oImgObj.width + '*' + oImgObj.height;

                if (oImgObj.width > oImgObj.height) { //长方形,高度需设置100%，宽度等比例剪切
                    w2 = (oImgObj.width * (iWidth / oImgObj.height));
                    oImg.style.width = w2 + 'px';
                    oImg.style.height = iHeight + 'px';
                    oImg.style.marginLeft = '-' + ((w2 - iWidth) / 2) + 'px';

                } else if (oImgObj.width < oImgObj.height) { //树型 ,宽度需设置100%，高度等比例剪切
                    h2 = (oImgObj.height * (iHeight / oImgObj.width));
                    oImg.style.width = iWidth + 'px';
                    oImg.style.height = h2 + 'px';
                    oImg.style.marginTop = '-' + ((h2 - iWidth) / 2) + 'px';

                } else { //正方形
                    oImg.style.width = '100%';
                    oImg.style.height = '100%';
                }
            }
            oImg.src = oImgObj.src;
            _this.fLoadImg(oImg);
        }
        , false);
    };

    window.SeeDownloadImg = SeeDownloadImg;
}
)();
