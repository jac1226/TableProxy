/**
 * Query Return Object
 * @return {Object}
 */

import UniqueSet from './unique-set';
import QueryDriver from './query-driver';
import RecordsContainer from './records-container';
import { getTimeStamp, getTimeDiff } from './utilities';

export default class QueryReturn {
  constructor(queryDriver) {
    if (!(queryDriver instanceof QueryDriver)) {
      throw new TypeError('QueryResult constructor requires QueryDriver input.');
    }
    this.query = queryDriver.query;
    this.type = queryDriver.type;
    this.resultSet = new UniqueSet();
    this.queryStartTime = getTimeStamp();
    this.queryDuration = null;
    this.recordsContainer = new RecordsContainer();
  }

  get count() {
    return this.resultSet.length;
  }

  get logStamp() {
    return `${this.type} query "${this.query.toString()}" completed in ${this.queryDuration}ms`;
  }

  push(input) {
    this.resultSet.push(input);
  }

  done() {
    this.queryDuration = getTimeDiff(this.queryStartTime);
    Logger.log(
      `${this.type} operation completed in ${this.queryDuration} ms.\n ${this.query.toString()}`
    );
    return this;
  }
}
