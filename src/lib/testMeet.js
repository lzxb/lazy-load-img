export default function (el, options = {}) {
  // 取得元素在可视区的位置（相对浏览器视窗）左右上下
  var bcr = el.getBoundingClientRect()
  // padding+border+width
  var mw = el.offsetWidth // 元素自身宽度
  var mh = el.offsetHeight // 元素自身的高度
  // 包含了导航栏
  var w = window.innerWidth // 视窗的宽度
  var h = window.innerHeight // 视窗的高度

  var boolX = (!((bcr.right - options.left) <= 0 && ((bcr.left + mw) - options.left) <= 0) && !((bcr.left + options.right) >= w && (bcr.right + options.right) >= (mw + w))) // 左右符合条件
  var boolY = (!((bcr.bottom - options.top) <= 0 && ((bcr.top + mh) - options.top) <= 0) && !((bcr.top + options.bottom) >= h && (bcr.bottom + options.bottom) >= (mh + h))) // 上下符合条件
  return el.width !== 0 && el.height !== 0 && boolX && boolY
}
