/**
 * QueryDriver class
 * @return {Object}
 */

import { SUPPORTED_ATTRIBUTES } from './CONSTANTS';
import { Map } from './map-unique';
import { AttributesSet } from './data-payload';
import { isFunction, inArray } from './utilities';

export default class QueryDriver {
  constructor(type) {
    this.type = type.toUpperCase();
    this.query = null;
    this.returnWithRecords = false;
    this.requestedAttributesSet = new AttributesSet();
    this.writeIndexColumnName = null;
    this.writeIndexAttribute = null;
    this.recordsToWrite = null;
    this.writeIffIndexUnique = true;
    this.otherResults = new Map();
  }

  setQuery(query) {
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
    return this;
  }

  setReturnWithRecords(bool) {
    this.returnWithRecords = bool === true;
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

  setRequestedAttributes(attributesSet) {
    if (attributesSet) {
      if (!(attributesSet instanceof AttributesSet)) {
        throw new TypeError(`setRequestedAttributes accepts AttributeSet instances.`);
      }
      this.requestedAttributesSet.copyValues(attributesSet);
    }
    return this;
  }

  addAttribute(attribute) {
    if (!inArray(attribute, SUPPORTED_ATTRIBUTES)) {
      throw new TypeError(`invalid attribute ${attribute}`);
    }
    this.requestedAttributesSet.push(attribute);
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
