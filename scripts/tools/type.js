const getType = item => (Object.prototype.toString.call(item).slice(8, -1));

getType.isNumber = (item) => getType(item) === 'Number';
getType.isString = item => getType(item) === 'String';
getType.isArray = item => getType(item) === 'Array';
getType.isObject = item => getType(item) === 'Object';
getType.isBoolean = item => getType(item) === 'Boolean';
getType.isNull = item => getType(item) === 'Null';
getType.isUndefined = item => getType(item) === 'Undefined';
getType.isFunction = item => getType(item) === 'Function';
getType.isDate = item => getType(item) === 'Date';
module.exports = getType;
