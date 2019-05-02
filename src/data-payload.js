/**
 * Data Payload class
 * @return {Object}
 */

import { Map, UniqueSet } from './map-unique';
import { SUPPORTED_ATTRIBUTES, DEFAULT_ATTRIBUTE } from './CONSTANTS';

export class DataPayload {
  constructor(dataObject, headerRow) {
    this.headerRow = headerRow;
    this.dataObject = dataObject;
  }

  getIndexOn(columnName, attribute) {
    const indexer = new Map();
    if (columnName === undefined && attribute === undefined) {
      this.pvt_dataPayload[DEFAULT_ATTRIBUTE].forEach((row, index) => {
        indexer.set(index, index);
      });
    } else {
      const attr = attribute === undefined ? DEFAULT_ATTRIBUTE : attribute;
      const columnIndex = this.headerRow.indexOf(columnName);

      if (columnIndex === -1) {
        throw new Error(
          `getIndexOn failed: column ${columnName} does not exist in this TableProxy instance.`
        );
      }
      if (SUPPORTED_ATTRIBUTES.indexOf(attr) === -1) {
        throw new Error(`getIndexOn failed: attribute ${attribute} is not supported.`);
      }

      this.pvt_dataPayload[attr].forEach((row, index) => {
        indexer.set(row[columnIndex], index);
      });
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
}
