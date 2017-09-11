import _ from './util'

const DEFAULT_OPTIONS = {
  showHeader: true,
  spacing: 1
}

var valuesToLengths = function(arr) {
  return arr.map((a) => {
    var b = {}
    Object.keys(a).forEach(function(key) {
      var val = a[key]
      if (val == null /* nullish */ || typeof val == 'function' || typeof val == 'object' || Array.isArray(val))
        b[key] = 0
         else if (_.isString(val))
        b[key] = val.length
         else
        b[key] = val.toString().length
    })
    return b
  })
}

var getColumnWidths = function(arr, options) {
  var retval = {}

  arr.forEach((a) => {
    Object.keys(a).forEach(function(key) {
      var len = a[key]
      if (retval[key])
        retval[key] = Math.max(len, retval[key])
         else
        retval[key] = len
    })
  })

  // take into account header widths
  if (options.showHeader === true)
  {
    Object.keys(retval).forEach(function(key) {
      var len = retval[key]
      retval[key] = Math.max(len, key.length)
    })
  }

  return retval
}

var sanitizeItems = function(arr) {
  var arr = [].concat(arr)

  return arr.map((a) => {
    var retval = {}
    Object.keys(a).forEach(function(key) {
      var val = a[key]
      if (_.isString(val) || _.isNumber(val))
        retval[key] = val
    })
    return retval
  })
}

var renderList = function(arr, options, lengths) {
  var retval = ''

  // render header
  if (options.showHeader === true)
  {
    // render column names
    Object.keys(lengths).forEach(function(key) {
      var len = lengths[key] + options.spacing
      retval += (key + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'

    // render column underline
    Object.keys(lengths).forEach(function(key) {
      var len = lengths[key] + options.spacing
      retval += ('-'.repeat(lengths[key]) + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  }

  // render rows
  arr.forEach((a) => {
    Object.keys(a).forEach(function(key) {
      var val = a[key]
      var len = lengths[key] + options.spacing

      if (_.isString(val))
        retval += (val + ' '.repeat(len)).substr(0, len)
         else
        retval += (val.toString() + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  })

  return retval
}

export default (items, options) => {
  var options = Object.assign({}, DEFAULT_OPTIONS, options)

  if (options.showHeader !== false)
    options.showHeader = true

  if (!_.isNumber(options.spacing))
    options.spacing = 1

  if (!Array.isArray(items) || items.length == 0)
    return ''

  var items = sanitizeItems(items)
  var val_lengths = valuesToLengths(items)
  var col_widths = getColumnWidths(val_lengths, options)
  return renderList(items, options, col_widths)
}
