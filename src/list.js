import _ from './util'
import assign from 'lodash.assign'

const DEFAULT_OPTIONS = {
  showHeader: true,
  spacing: 1
}

var valuesToLengths = function(arr) {
  var retval = []

  for (var i = 0; i < arr.length; ++i) {
    var a = arr[i]
    var b = {}

    for (var key in a) {
      if (!_.has(a, key))
        continue

      var val = a[key]
      if (_.isNil(val) || _.isFunction(val) || _.isObject(val) || _.isArray(val))
        b[key] = 0
         else if (_.isString(val))
        b[key] = val.length
         else
        b[key] = val.toString().length
    }

    retval.push(b)
  }

  return retval
}

var getColumnWidths = function(arr, options) {
  var retval = {}

  for (var i = 0; i < arr.length; ++i) {
    var a = arr[i]

    for (var key in a) {
      if (!_.has(a, key))
        continue

      var len = a[key]
      if (retval[key])
        retval[key] = Math.max(len, retval[key])
         else
        retval[key] = len
    }
  }

  // take into account header widths
  if (options.showHeader === true)
  {
    for (var key in retval) {
      if (!_.has(retval, key))
        continue

      var len = retval[key]
      retval[key] = Math.max(len, key.length)
    }
  }

  return retval
}

var sanitizeItems = function(arr) {
  var retval = []

  for (var i = 0; i < arr.length; ++i) {
    var a = arr[i]
    var b = {}

    for (var key in a) {
      if (!_.has(a, key))
        continue

      var val = a[key]
      if (_.isString(val) || _.isNumber(val))
        b[key] = val
    }

    retval.push(b)
  }

  return retval
}

var renderList = function(arr, options, lengths) {
  var retval = ''

  // render header
  if (options.showHeader === true)
  {
    var header = ''
    var underline = ''

    // render column names
    for (var key in lengths) {
      if (!_.has(lengths, key))
        continue

      var len = lengths[key] + options.spacing
      header += (key + ' '.repeat(len)).substr(0, len)
      underline += ('-'.repeat(lengths[key]) + ' '.repeat(len)).substr(0, len)
    }

    retval += header
    retval += '\n'
    retval += underline
    retval += '\n'
  }

  // render rows
  for (var i = 0; i < arr.length; ++i) {
    var a = arr[i]
    var row = ''

    for (var key in a) {
      if (!_.has(a, key))
        continue

      var val = a[key]
      var len = lengths[key] + options.spacing

      if (_.isString(val))
        row += (val + ' '.repeat(len)).substr(0, len)
         else
        row += (val.toString() + ' '.repeat(len)).substr(0, len)
    }

    retval += row
    retval += '\n'
  }

  return retval
}

export default (items, options) => {
  var options = assign({}, DEFAULT_OPTIONS, options)

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
