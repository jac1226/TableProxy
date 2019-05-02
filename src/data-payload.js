/**
 * Data Payload class
 * @return {Object}
 */

import { Map, UniqueSet } from './map-unique';
import { SUPPORTED_ATTRIBUTES, DEFAULT_ATTRIBUTE } from './CONSTANTS';

export class DataPayload {
  constructor(dataObject, headerRowIndex, headerColumnIndex) {
    this.headerRowIndex = headerRowIndex;
    this.headerColumnIndex = headerColumnIndex;
    this.headerRow = dataObject[DEFAULT_ATTRIBUTE][headerRowIndex];
    this.dataObject = dataObject;
  }

  getIndexOn(columnName, attribute) {
    const indexer = new Map();

    if (columnName === undefined && attribute === undefined) {
      this.dataObject[DEFAULT_ATTRIBUTE].forEach((row, index) => {
        indexer.set(index, index);
      });
    } else {
      const attr = attribute === undefined ? Object.keys(this.dataObject)[0] : attribute;
      const columnIndex = this.headerRow.indexOf(columnName);
      if (columnIndex === -1) {
        throw new Error(
          `getIndexOn failed: column ${columnName} does not exist in this TableProxy instance.`
        );
      }
      if (SUPPORTED_ATTRIBUTES.indexOf(attr) === -1) {
        throw new Error(`getIndexOn failed: attribute ${attribute} is not supported.`);
      }

      // eslint-disable-next-line prefer-destructuring
      const length = this.dataObject[attr].length;
      for (let i = this.headerRowIndex; i < length; i += 1) {
        indexer.set(this.dataObject[attr][i][columnIndex], i);
      }
    }

    return indexer;
  }
}

export class AttributesSet extends UniqueSet {
  push(attribute) {
    if (SUPPORTED_ATTRIBUTES.indexOf(attribute) === -1) {
      throw new Error(`${attribute} is not a supported attribute.`);
    }
    return this.set(attribute);
  }

  withAll() {
    SUPPORTED_ATTRIBUTES.forEach(attribute => {
      this.push(attribute);
    });
    return this;
  }
}
