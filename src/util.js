
var has = (v, k) => {
  return v.hasOwnProperty(k)
}

var isArray = (v) => {
  return Array.isArray(v)
}

var isFunction = (v) => {
  return typeof v == 'function'
}

var isNil = (v) => {
  return v == null /* nullish */
}

var isString = (v) => {
  const type = typeof v
  return type == 'string' || (type == 'object' && v != null && !Array.isArray(v) && Object.prototype.toString.call(v) == '[object String]')
}

var isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

var isObject = (v) => {
  const type = typeof v
  return v != null && (type == 'object' || type == 'function')
}

export default {
  has,
  isArray,
  isFunction,
  isNil,
  isString,
  isNumber,
  isObject
}
