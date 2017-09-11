// individual lodash includes
import pickBy from 'lodash.pickby'

// emulate lodash syntax
var _ = {
  pickBy
}

function isString(v) {
  const type = typeof v
  return type == 'string' || (type == 'object' && v != null && !Array.isArray(v) && Object.prototype.toString.call(v) == '[object String]')
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

var default_options = {
  showHeader: true,
  spacing: 1
}

var valuesToLengths = function(arr) {
  return arr.map((a) => {
    var b = {}
    for (var key in a) {
      var val = a[key]
      if (val == null /* nullish */ || typeof val == 'function' || typeof val == 'object' || Array.isArray(val))
        b[key] = 0
         else if (isString(val))
        b[key] = val.length
         else
        b[key] = val.toString().length
    }
    return b
  })
}

var getColumnWidths = function(arr, options) {
  var retval = {}

  arr.forEach((a) => {
    for (var key in a) {
      var len = a[key]
      if (retval[key])
        retval[key] = Math.max(len, retval[key])
         else
        retval[key] = len
    }
  })

  // take into account header widths
  if (options.showHeader === true)
  {
    for (var key in retval) {
      var len = retval[key]
      retval[key] = Math.max(len, key.length)
    }
  }

  return retval
}

var sanitizeItems = function(arr) {
  var arr = [].concat(arr)

  return arr.map((a) => {
    return _.pickBy(a, function(val) {
      return isString(val) || isNumber(val)
    })
  })
}

var renderList = function(arr, options, lengths) {
  var retval = ''

  if (options.showHeader === true)
  {
    for (var key in lengths) {
      var len = lengths[key] + options.spacing
      retval += (key + ' '.repeat(len)).substr(0, len)
    }

    retval += '\n'

    for (var key in lengths) {
      var len = lengths[key] + options.spacing
      retval += ('-'.repeat(val) + ' '.repeat(len)).substr(0, len)
    }

    retval += '\n'
  }

  arr.forEach((a) => {
    for (var key in a) {
      var val = a[key]
      var len = lengths[key] + options.spacing

      if (isString(val))
        retval += (val + ' '.repeat(len)).substr(0, len)
         else
        retval += (val.toString() + ' '.repeat(len)).substr(0, len)
    }

    retval += '\n'
  })

  return retval
}

export default (items, options) => {
  var options = Object.assign({}, default_options, options)

  if (options.showHeader !== false)
    options.showHeader = true

  if (!isNumber(options.spacing))
    options.spacing = 1

  if (!Array.isArray(items) || items.length == 0)
    return ''

  var items = sanitizeItems(items)
  var lengths = getColumnWidths(valuesToLengths(items), options)
  return renderList(items, options, lengths)
}
