var canvas = document.createElement('canvas')
canvas.getContext('2d').globalAlpha = 0.0
var images = {}

export default function (src, w, h) {
  if (images[src]) return images[src]
  canvas.width = w
  canvas.height = h
  var data = canvas.toDataURL('image/png')
  images[src] = data
  return data
}
