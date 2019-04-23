import clone from './simple-clone';
import { isString, isNumeric, inArray, isObject } from './utilities';
import { SUPPORTED_ATTRIBUTES, DEFAULT_ATTRIBUTE } from './CONSTANTS';

export default function processUniqueId(input) {
  if (!isObject(input)) {
    throw new TypeError(`uniqueId must be an object.`);
  }
  if (!Object.hasOwnProperty.call(input, 'columnName')) {
    throw new TypeError(`uniqueId must be an object with columnName property.`);
  }
  if (!isString(input.columnName) && !isNumeric(input.columnName)) {
    throw new TypeError(`uniqueId.columnName must be a string or number.`);
  }
  if (
    Object.hasOwnProperty.call(input, 'attribute') &&
    !inArray(input.attribute, SUPPORTED_ATTRIBUTES)
  ) {
    throw new TypeError(`uniqueId.attribute must be a supported attribute.`);
  }
  const defaultUniqueId = { columnName: null, attribute: DEFAULT_ATTRIBUTE };
  return Object.assign(defaultUniqueId, clone(input));
}
