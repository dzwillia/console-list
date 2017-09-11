
var isString = (v) => {
  const type = typeof v
  return type == 'string' || (type == 'object' && v != null && !Array.isArray(v) && Object.prototype.toString.call(v) == '[object String]')
}

var isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default {
  isNumber,
  isString
}
