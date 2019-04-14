  /**
   * Simple cloning - supports input types {null,undefined,Date,Array,Object,String,Number)
   * @desc taken from https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
   */
  export const simpleClone = (input) => {
      var copy;

      // Handle non-referential, null, undefined
      if (input == null || typeof (input) != "object") {
          return input;
      }

      // Handle Date
      if (input instanceof Date) {
          copy = new Date();
          copy.setTime(input.getTime());
          return copy;
      }

      // Handle Array
      if (input instanceof Array) {
          copy = [];
          for (var i = 0, length = input.length; i < length; i++) {
              copy[i] = simpleClone(input[i]);
          }
          return copy;
      }

      // Handle Object
      if (input instanceof Object) {
          copy = {};
          for (var property in input) {
              if (input.hasOwnProperty(property)) {
                  copy[property] = simpleClone(input[property]);
              }
          }
          return copy;
      }

      throw new TypeError('Unable to clone: object type "' + typeof (input) + '" is unsupported.');
  }