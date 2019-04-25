/**
 * query
 */

import QueryDriver from './query-driver';
import processQuery from './process-query';

export default function runQuery(core, query, withRecords) {
  const queryDriver = new QueryDriver(query, 'query');
  queryDriver.withRecords = withRecords || false;

  return processQuery(core, queryDriver);
}
