/**
 * 格式化枚举成数组
 * @param _enum 枚举对象
 */
export function formatEnumToArray(_enum) {
  return Object.keys(_enum).map(e => ({ key: e, value: _enum[e] }))
}

/**
 * 格式化数组成为枚举
 * @param _arr 数据
 * @param keyName key名称，默认 code
 * @param valueName value名称，默认 name
 */
export function formatArrayToEnum(_arr, keyName = 'code', valueName = 'name') {
  let _map = {}
  _arr.forEach(e => {
    _map[e[keyName]] = e[valueName]
  })
  return _map
}
