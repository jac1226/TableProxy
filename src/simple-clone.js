/**
 * Simple cloning - supports input types {null,undefined,Date,Array,Object,String,Number)
 * @desc taken from https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
 */

export const simpleClone = (input) => {
  let copy;
  const toStringType=toString.call(input);
  switch (toStringType) {
    case '[object Undefined]':
    case '[object Null]':
    case '[object Number]':
    case '[object String]':
      copy = input;
      break;
    case '[object Array]':
      copy = input.map(i => {
        return simpleClone(i);
      });
      break;
    case '[object Object]':
      copy = {};
      for (let property in input) {
        if (input.hasOwnProperty(property)) {
          copy[property] = simpleClone(input[property]);
        }
      }
      break;
    case '[object Date]':
      copy = new Date();
      copy.setTime(input.getTime());
      break;
    default:
      throw new TypeError(`Unable to clone: object type ${toStringType} is unsupported.`);
  }
  return copy;
};
  