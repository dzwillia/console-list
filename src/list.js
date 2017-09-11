// individual lodash includes
import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'
import pickBy from 'lodash.pickby'
import forEach from 'lodash.foreach'

function isString(v) {
  const type = typeof v
  return type == 'string' || (type == 'object' && v != null && !Array.isArray(v) && Object.prototype.toString.call(v) == '[object String]')
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

// emulate lodash syntax
var _ = {
  map,
  pickBy,
  forEach,
  mapValues
}

var default_options = {
  showHeader: true,
  spacing: 1
}

var valuesToLengths = function(arr) {
  return _.map(arr, (a) => {
    return _.mapValues(a, (val, key) => {
      if (val == null /* nullish */ || typeof val == 'function' || typeof val == 'object' || Array.isArray(val))
        return 0
         else if (isString(val))
        return val.length
         else
        return val.toString().length
    })
  })
}

var getColumnWidths = function(arr, options) {
  var retval = {}

  _.forEach(arr, (a) => {
    _.forEach(a, (len, key) => {
      if (retval[key])
        retval[key] = Math.max(len, retval[key])
         else
        retval[key] = len
    })
  })

  // take into account header widths
  if (options.showHeader === true)
  {
    _.forEach(retval, (len, key) => {
      retval[key] = Math.max(len, key.length)
    })
  }

  // add spacing to column width
  _.forEach(retval, (len, key) => {
    retval[key] = len
  })

  return retval
}

var sanitizeItems = function(arr) {
  var arr = [].concat(arr)

  return _.map(arr, (a) => {
    return _.pickBy(a, function(val) {
      return isString(val) || isNumber(val)
    })
  })
}

var renderList = function(arr, options, lengths) {
  var retval = ''

  if (options.showHeader === true)
  {
    _.forEach(lengths, (val, key) => {
      var len = val + options.spacing
      retval += (key + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'

    _.forEach(lengths, (val, key) => {
      var len = val + options.spacing
      retval += ('-'.repeat(val) + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  }

  _.forEach(arr, (a) => {
    _.forEach(a, (val, key) => {
      var len = lengths[key] + options.spacing

      if (isString(val))
        retval += (val + ' '.repeat(len)).substr(0, len)
         else
        retval += (val.toString() + ' '.repeat(len)).substr(0, len)
    })

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
