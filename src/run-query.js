/**
 * API method query
 */

import QueryDriver from './query-driver';
import processQuery from './process-query';
import { log } from './sheets-utilities';

export default function runQuery(core, query, withRecords) {
  const queryDriver = new QueryDriver(query, 'query');
  queryDriver.withRecords = withRecords || false;

  const queryReturn = processQuery(core, queryDriver);
  log(queryReturn.logStamp);

  return queryReturn;
}
