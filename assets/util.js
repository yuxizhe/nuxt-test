
function getWindowSize (options) {
  const screenX = typeof window.screenX || window.screenLeft
  const screenY = typeof window.screenY || window.screenTop
  const outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : document.documentElement.clientWidth
  const outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22)
  const width = typeof options !== 'undefined' && typeof options.width !== 'undefined' ? options.width : 580
  const height = typeof options !== 'undefined' && typeof options.height !== 'undefined' ? options.height : 355
  const left = parseInt(screenX + ((outerWidth - width) / 2), 10)
  const top = parseInt(screenY + ((outerHeight - height) / 2.5), 10)

  return 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'
}
function getAppVersion () {
  var ua = navigator.userAgent
  var uaArr = ua.split(' ')// Xueqiu iPhone 6.0-dev-1111
  if (uaArr.length >= 3) {
    var longVersion = uaArr[2]
    var longVersionArr = longVersion.split('-')
    var appVersion = parseFloat(longVersionArr[0])
    return appVersion
  }
}

export {getAppVersion, getWindowSize}
