function isString(x) {
  return (typeof x === 'string' || x instanceof String);
}

function isObject(x) {
  return x !== null && typeof x === 'object';
}

function isFunction(functionToCheck) {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export default {
  isString,
  isObject,
  isFunction,
};
