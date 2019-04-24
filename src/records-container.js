/**
 * Records Container
 * @return {Object}
 */

export default function RecordsContainer() {}
RecordsContainer.prototype = {};
RecordsContainer.prototype.index = -1;
RecordsContainer.prototype.push = function push(value, index) {
  if (index === undefined) {
    this[(this.prototype.index += 1)] = value;
  } else {
    this[index] = value;
  }
  return this;
};
RecordsContainer.prototype.flush = function flush() {
  const self = this;
  Object.keys(this).forEach(index => {
    delete self[index];
  });
  return this;
};
RecordsContainer.prototype.absorb = function absorb(input) {
  if (!(input instanceof RecordsContainer)) {
    throw new Error('shit');
  }
  this.flush();
  Object.assign(this, input);
  return this;
};
