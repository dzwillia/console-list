// individual lodash includes
import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'
import pickBy from 'lodash.pickby'
import forEach from 'lodash.foreach'
import isNil from 'lodash.isnil'
import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'

// emulate lodash syntax
var _ = {
  map,
  pickBy,
  forEach,
  isNil,
  isArray,
  isString,
  isNumber,
  isObject,
  isFunction,
  mapValues
}

var default_options = {
  showHeader: true,
  spacing: 1
}

var valuesToLengths = function(arr) {
  return _.map(arr, (a) => {
    return _.mapValues(a, (val, key) => {
      if (isNil(val) || _.isFunction(val) || _.isObject(val) || _.isArray(val))
        return 0
         else if (_.isString(val))
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
      return _.isString(val) || _.isNumber(val)
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
  var options = Object.assign({}, default_options, options)

  if (options.showHeader !== false)
    options.showHeader = true

  if (!_.isNumber(options.spacing))
    options.spacing = 1

  if (!_.isArray(items) || items.length == 0)
    return ''

  var items = sanitizeItems(items)
  var lengths = getColumnWidths(valuesToLengths(items), options)
  return renderList(items, options, lengths)
}
