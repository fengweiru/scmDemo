/**
 * 文件下载
 * @param url
 */
export function download(url, filename = 'xxx') {
  ajax(
    url,
    function(xhr) {
      downloadFile(xhr.response, filename)
    },
    {
      responseType: 'blob'
    }
  )
}

function downloadFile(content, filename) {
  var a = document.createElement('a')
  var blob = new Blob([content])
  var url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

function ajax(url, callback, options) {
  const userInfo = localStorage.getItem('auth-info')
  const token = (userInfo && JSON.parse(userInfo).token) || ''
  window.URL = window.URL || window.webkitURL
  var xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.setRequestHeader('_mes_auth_token', token)
  if (options.responseType) {
    xhr.responseType = options.responseType
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr)
    }
  }
  xhr.send()
}
