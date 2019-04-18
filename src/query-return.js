/**
 * Query Return Object
 * @return {Object}
 */

import { getTimeStamp, getTimeDiff } from './utilities';
import UniqueSet from './unique-set';
import QueryDriver from './query-driver';

export default class QueryReturn {
  constructor(queryDriver){
    if (!(queryDriver instanceof QueryDriver)) {
      throw new TypeError('QueryResult constructor requires QueryDriver input.');
    }
    this.query = queryDriver.query;
    this.type = queryDriver.type;
    this.resultSet = new UniqueSet();
    this.queryStartTime = getTimeStamp();
    this.queryDuration = null;
    this.returnContainer = {
        records: {},
        errors: []
    };
  }

  get count(){
    return this.resultSet.length;
  }

  push(input){
    this.resultSet.push(input);
  }

  done(){
    this.queryDuration = getTimeDiff(this.queryStartTime);
    Logger.log(this.type + ' operation completed in ' + this.queryDuration + 'ms.\n' + this.query.toString());
  }
}
