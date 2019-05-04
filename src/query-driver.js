/**
 * QueryDriver class
 * @return {Object}
 */

import { SUPPORTED_ATTRIBUTES, SUPPORTED_OPS } from './CONSTANTS';
import { Map } from './map-unique';
import { AttributesSet } from './data-payload';
import { isFunction, inArray, isArray, isObject } from './utilities';

export default class QueryDriver {
  constructor(type) {
    this.type = type.toUpperCase();
    this.query = null;
    this.returnWithRecords = false;
    this.requestedAttributesSet = new AttributesSet();
    this.matchColumnName = null;
    this.matchAttributeName = null;
    this.matchUnique = true;
    this.recordsToWrite = null;
    this.otherResults = new Map();
  }

  setType(type) {
    if (!inArray(type.toUpperCase(), SUPPORTED_OPS)) {
      throw new Error(`invalid query type: ${type}.`);
    }
    this.type = type.toUpperCase();
  }

  setQuery(query) {
    if (!isFunction(query)) {
      throw new TypeError('query must be a function.');
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

  setRecordObjectsToWrite(arrayOfRecords) {
    if (!isArray(arrayOfRecords)) {
      throw new TypeError(`expecting an array of record objects.`);
    }
    arrayOfRecords.forEach((record, index) => {
      if (!isObject(record)) {
        throw new TypeError(
          `record object array contained ${toString.call(record)} at index ${index}.`
        );
      }
    });
    const json = JSON.stringify(arrayOfRecords);
    SUPPORTED_ATTRIBUTES.forEach(attribute => {
      if (new RegExp(`"${attribute}":`, 'g').test(json)) {
        this.requestedAttributesSet.push(attribute);
      }
    });
    this.recordsToWrite = arrayOfRecords;
    return this;
  }

  addAttributes(attributesSet) {
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

  setMatchColumnName(columnName) {
    this.matchColumnName = columnName.trim();
    return this;
  }

  setMatchAttributeName(attribute) {
    this.matchAttributeName = attribute.trim();
    return this;
  }

  setMatchUnique(bool) {
    this.matchUnique = bool !== false;
    return this;
  }
}
