/**
 * Data Payload class
 * @return {Object}
 */

import { Map, UniqueSet } from './map-unique';
import { inArray } from './utilities';
import { SUPPORTED_ATTRIBUTES, DEFAULT_ATTRIBUTE } from './CONSTANTS';

export class DataPayload {
  constructor(dataObject, headerRowIndex, headerColumnIndex, headerRow) {
    this.headerRowIndex = headerRowIndex;
    this.headerColumnIndex = headerColumnIndex;
    this.headerRow = headerRow;
    this.dataObject = dataObject;
  }

  getDataIndex(columnName, attribute) {
    const dataIndex = new Map();

    if (columnName === undefined && attribute === undefined) {
      this.dataObject[DEFAULT_ATTRIBUTE].forEach((row, index) => {
        dataIndex.set(index, index);
      });
    } else {
      const attr = attribute === undefined ? Object.keys(this.dataObject)[0] : attribute;
      const columnIndex = this.headerRow.indexOf(columnName);
      if (columnIndex === -1) {
        throw new Error(`failed to get dataIndex on invalid column ${columnName}.`);
      }
      if (!inArray(attr, Object.keys(this.dataObject))) {
        throw new Error(`failed to get dataIndex on invalid attribute ${attribute}.`);
      }

      // eslint-disable-next-line prefer-destructuring
      const length = this.dataObject[attr].length;
      for (let i = this.headerRowIndex; i < length; i += 1) {
        dataIndex.set(this.dataObject[attr][i][columnIndex], i);
      }
    }

    return dataIndex;
  }
}

export class AttributesSet extends UniqueSet {
  push(attribute) {
    if (!inArray(attribute, SUPPORTED_ATTRIBUTES)) {
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
