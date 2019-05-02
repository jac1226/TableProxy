/**
 * QueryDriver class
 * @return {Object}
 */

import { UniqueSet } from './map-unique';
import { SUPPORTED_ATTRIBUTES } from './CONSTANTS';
import { isFunction } from './utilities';

export default class QueryDriver {
  constructor(type) {
    this.type = type.toUpperCase();
    this.query = null;
    this.returnWithRecords = false;
    this.requestedAttributesSet = new UniqueSet();
    this.writeIndexColumnName = null;
    this.writeIndexAttribute = null;
    this.recordsToWrite = null;
    this.writeIffIndexUnique = true;
  }

  setQuery(query) {
    if (!isFunction(query)) {
      throw new TypeError('loadQuery requires accepts a function callback');
    }
    this.pvt_query = query;
    const queryAsString = query.toString();
    SUPPORTED_ATTRIBUTES.forEach(attribute => {
      const re1 = new RegExp(`[[]{1}['|"]{1}${attribute}['|"]{1}[]]{1}`, 'g');
      const re2 = new RegExp(`[.]{1}${attribute}[^a-zA-Z0-9]`, 'g');
      if (re1.test(queryAsString) || re2.test(queryAsString)) {
        this.requestedAttributesSet.push(attribute);
      }
    });
    return this;
  }

  setReturnWithRecords(bool) {
    this.withRecords = bool === true;
    return this;
  }

  setRecordsToWrite(arrayOfRecords) {
    if (toString.call(arrayOfRecords) !== '[object Array]') {
      throw new TypeError(`setRecordsToWrite expects an array.`);
    }
    SUPPORTED_ATTRIBUTES.forEach(attribute => {
      this.requestedAttributesSet.push(attribute);
    });
    this.recordsToWrite = arrayOfRecords;
    return this;
  }

  addAttribute(attribute) {
    if (SUPPORTED_ATTRIBUTES.indexOf(attribute) === -1) {
      throw new TypeError(`invalid attribute ${attribute}`);
    }
    this.requestedAttributeSet.push(attribute);
    return this;
  }

  setWriteIndexColumnName(columnName) {
    this.indexColumnName = columnName.trim();
    return this;
  }

  setWriteIndexAttribute(attribute) {
    this.indexAttribute = attribute.trim();
    return this;
  }

  setWriteIffIndexUnique(bool) {
    this.writeIffIndexUnique = bool === true;
    return this;
  }
}
