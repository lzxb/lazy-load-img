export default class GetTransparent {
  constructor () {
    this.images = {}
    this.canvas = document.createElement('canvas')
    this.canvas.getContext('2d').globalAlpha = 0.0
  }
  toBase64 (src, w, h) {
    if (this.images[src]) return this.images[src]
    this.canvas.width = w
    this.canvas.height = h
    var data = this.canvas.toDataURL('image/png')
    this.images[src] = data
    return data
  }
  destroy () {
    this.images = null
    this.canvas = null
  }
}
