/**
 * Query Return Object
 * @return {Object}
 */

import QueryDriver from './query-driver';
import { Map } from './map-unique';
import Timer from './timer';

export default class QueryReturn {
  constructor(queryDriver) {
    if (!(queryDriver instanceof QueryDriver)) {
      throw new TypeError('QueryResult constructor requires QueryDriver input.');
    }
    this.type = queryDriver.type;
    this.query = queryDriver.query;
    this.timer = new Timer(`${queryDriver.type}`);
    this.resultSet = new Map();
    this.otherResults = new Map();
  }

  get count() {
    return this.resultSet.length;
  }

  push(index, record) {
    this.resultSet.set(index, record);
    return this;
  }

  has(index) {
    return this.resultSet.has(index);
  }

  done() {
    this.timer.stop(this.query.toString());
    return this;
  }
}
