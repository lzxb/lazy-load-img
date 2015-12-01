/*
 var obj = {
 name: '狼族小狈',
 QQ: 1340641314,
 github: 'https://github.com/1340641314/SeeDownloadImg',
 statement: '在保留头部版权的情况下，可以自由发布修改，应用于商业用途',
 version: '2.0.1',
 update: '2015-11-21'
 };
 */
(function () {

  function SeeDownloadImg(setting) {
    //选择器
    this.selector = '[data-lz-src]';
    //元素在顶部伸出的距离才加载
    this.iTop = setting.iTop || 0;
    //元素在底部伸出的距离才加载
    this.iBottom = setting.iBottom || 0;
    //图片加载完成后执行方法
    this.fLoadImg = setting.fLoadImg || function (oImg) {};
    //存储需要加载的元素列表
    this.aElements = [];
    this.bStatus = true;
    //检测状态值
    this.bSquare = setting.bSquare || false;
    //是否将图片剪切成正方形

    this.init();
  };

  SeeDownloadImg.prototype.init = function () {
    var _this = this;
    if (!this.initStatus)
      window.addEventListener('load', function () {
        _this.getElements();
        //获取元素
        _this.each();
      }, false);

    window.addEventListener('scroll', function () {

      if (_this.bStatus) {
        _this.each();
      } else {
        _this.getElements();
      }
    }, false);

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
    //避免本次循环没结束，又开启新的循环
    this.bStatus = true;

  };

  SeeDownloadImg.prototype.testMeet = function (element) {

    var iTop = this.iTop; //元素在顶部伸出的高度才加载，单位px
    var iBottom = this.iBottom; //元素在底部伸出的高度才加载，单位px

    var status = element.getBoundingClientRect(); //取得元素在屏幕的位置信息
    var iObjHeight = element.offsetHeight; //元素自身的高度
    var iWinHeight = document.body.clientHeight; //网页可见区域高
    var conut = -1;

    for (attr in status) {
      conut += status[attr];
      element.dataset[attr] = status[attr]; //将元素的位置信息设置到自定义属性，方便调试程序
    }
    if (!conut) return; //元素未显示到页面，直接false。原因是元素或其父元素display = none;

    if ((status.bottom - iTop) <= 0 && ((status.top + iObjHeight) - iTop) <= 0) {
      element.dataset.status = '元素被隐藏可视区上面';
      return false;
    } else if ((status.top + iBottom) >= iWinHeight && (status.bottom + iBottom) >= (iObjHeight + iWinHeight)) {
      element.dataset.status = '元素被隐藏可视区下面';
      return false;
    } else{
      element.dataset.status = '元素在可视区内';
      return true;
    }

  };

  SeeDownloadImg.prototype.loadImg = function (oImg, url) {

    var _this = this;
    //原来默认图片的宽度
    var iWidth = oImg.width;
    //原来默认图片的高度
    var iHeight = oImg.height;

    var oImgObj = new Image();
    oImgObj.src = url;

    oImgObj.addEventListener('load', function () {

      if (_this.bSquare) { //将图片剪切成正方形
        oImg.parentNode.style.overflow = 'hidden'; //设置父级元素溢出隐藏
        oImg.parentNode.style.width = iWidth + 'px';
        oImg.parentNode.style.height = iHeight + 'px';
        var w2 = 0; //宽度
        var h2 = 0; //高度

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
    }, false);
  };

  window.SeeDownloadImg = SeeDownloadImg;
})();
