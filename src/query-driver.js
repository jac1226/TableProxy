/**
 * QueryDriver class
 * @return {Object}
 */

import UniqueSet from './unique-set';
import { SUPPORTED_ATTRIBUTES } from './CONSTANTS';

export default class QueryDriver {
  constructor(query, type) {
    this.query = null;
    this.type = type.toUpperCase();
    this.writeToCursor = false;
    this.withRecords = false;
    this.requestedAttributes = new UniqueSet();
    this.loadQuery(query);
  }

  loadQuery(query) {
    if (toString.call(query) !== '[object Function]') {
      throw new TypeError('loadQuery requires accepts a function callback');
    }
    this.query = query;
    const queryAsString = query.toString();
    SUPPORTED_ATTRIBUTES.forEach(attribute => {
      const reString = `.{0,1}['|"|[]{0,1}' ${attribute} '[['|"]{0,1}`;
      const regex = new RegExp(reString, 'g');
      if (regex.test(queryAsString)) {
        this.requestedAttributes.push(attribute);
      }
    });
  }
}
