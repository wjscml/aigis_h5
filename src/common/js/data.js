export function padDate (v) {
    v = v < 10 ? '0' + v : v
    return v
}
  
export function formatDate (timestamp) {
    var date = new Date(timestamp)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    return y + '/' + m + '/' + d
}
  
export function getCurrentTime (timestamp) {
    var date = new Date(timestamp)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var hh = date.getHours()
    var mm = date.getMinutes()
    var ss = date.getTime() % 60000
    ss = (ss - (ss % 1000)) / 1000
    return y + '/' + m + '/' + d + ' ' + (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
}
  
export function unique (arr) { // 数组去重
    var res = []
    var json = {}
    for (var i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i])
        json[arr[i]] = 1
      }
    }
    return res
}
  
export function extend (target, source) { // 对象合并不覆盖
    for (var obj in source) {
      if (target[obj]) {
        target[obj] = target[obj].concat(source[obj])
      } else {
        target[obj] = source[obj]
      }
    }
    return target
}
  
export function formatNumber (nStr) {
    nStr += ''
    var x = nStr.split('.')
    var x1 = x[0]
    var x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
}
  
export function toDecimal (x) {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return x
    }
    var s = f.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
}
export function toPercent (str) {
  var f = parseFloat(str)
  if (isNaN(f)) {
    return str
  }
  return (Math.round(str * 10000) / 100).toFixed(2) + '%'
}
  