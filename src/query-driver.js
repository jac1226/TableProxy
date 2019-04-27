/**
 * QueryDriver class
 * @return {Object}
 */

import UniqueSet from './unique-handling';
import { SUPPORTED_ATTRIBUTES } from './CONSTANTS';
import { isFunction } from './utilities';

export default class QueryDriver {
  constructor(query, type) {
    this.query = null;
    this.type = type.toUpperCase();
    this.withRecords = false;
    this.requestedAttributesSet = new UniqueSet();
    this.loadQuery(query);
  }

  loadQuery(query) {
    if (!isFunction(query)) {
      throw new TypeError('loadQuery requires accepts a function callback');
    }
    this.query = query;
    const queryAsString = query.toString();
    SUPPORTED_ATTRIBUTES.forEach(attribute => {
      const re1 = new RegExp(`[[]{1}['|"]{1}${attribute}['|"]{1}[]]{1}`, 'g');
      const re2 = new RegExp(`[.]{1}${attribute}[^a-zA-Z0-9]`, 'g');
      if (re1.test(queryAsString) || re2.test(queryAsString)) {
        this.requestedAttributesSet.push(attribute);
      }
    });
  }
}
