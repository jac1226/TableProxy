/**
 * Query Return Object
 * @return {Object}
 */

import QueryDriver from './query-driver';
import { Map } from './map-unique';
import Timer from './timer';
import { AttributesSet } from './data-payload';

export default class QueryReturn {
  constructor(queryDriver) {
    if (!(queryDriver instanceof QueryDriver)) {
      throw new TypeError('QueryResult constructor requires QueryDriver input.');
    }
    this.type = queryDriver.type;
    this.query = queryDriver.query;
    this.timer = new Timer(`${queryDriver.type}`);
    this.resultSet = new Map();
    this.otherResults = queryDriver.otherResults;
    this.attributesSet = new AttributesSet().copyValues(queryDriver.requestedAttributesSet);
    this.returnWithRecords = queryDriver.returnWithRecords;
    this.errors = new Map();
    this.warnings = new Map();
  }

  get count() {
    return this.resultSet.length;
  }

  pushResult(index, record) {
    this.resultSet.set(index, record);
    return this;
  }

  pushWarning(index, content) {
    this.warnings.set(index, content);
    return this;
  }

  pushError(index, content) {
    this.errors.set(index, content);
    return this;
  }

  done() {
    this.timer.stop(this.query.toString());
    return this;
  }
}
