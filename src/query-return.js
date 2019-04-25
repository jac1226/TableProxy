/**
 * Query Return Object
 * @return {Object}
 */

import UniqueSet from './unique-set';
import QueryDriver from './query-driver';
import RecordsContainer from './records-container';
import Timer from './timer';

export default class QueryReturn {
  constructor(queryDriver) {
    if (!(queryDriver instanceof QueryDriver)) {
      throw new TypeError('QueryResult constructor requires QueryDriver input.');
    }
    this.query = queryDriver.query;
    this.type = queryDriver.type;
    this.timer = new Timer(`${queryDriver.type}`);
    this.resultSet = new UniqueSet();
    this.recordsContainer = new RecordsContainer();
  }

  get count() {
    return this.resultSet.length;
  }

  push(input) {
    this.resultSet.push(input);
  }

  done() {
    this.timer.stop(this.query.toString());
    return this;
  }
}
