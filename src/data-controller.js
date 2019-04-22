/**
 * DataController class
 * @param {Object} sheetAccessor - SheetAccessor instance
 * @param {Object} instanceOptions - InstanceOptions instance
 * @param {Object} requestedAttributes - UniqueSet instance
 */

import { WRITE_LEVEL_CELL, WRITE_LEVEL_ROW, WRITE_LEVEL_TABLE } from './CONSTANTS';
import SheetAccessor from './sheet-accessor';
import InstanceOptions from './instance-options';
import UniqueSet from './unique-set';

export default class DataController {
  constructor(sheetAccessor, instanceOptions, requestedAttributesSet) {
    if (!(sheetAccessor instanceof SheetAccessor)) {
      throw new TypeError(`DataController requires an instance of InstanceOptions object.`);
    }
    if (!(instanceOptions instanceof InstanceOptions)) {
      throw new TypeError(`DataController requires an instance of InstanceOptions object.`);
    }
    if (!(requestedAttributesSet instanceof UniqueSet)) {
      throw new TypeError(
        `DataController requires a UniqueSet instance for requestedAttributesSet.`
      );
    }
    if (requestedAttributesSet.length < 1) {
      throw new TypeError(
        `DataController requires a UniqueSet instance for requestedAttributesSet.`
      );
    }

    this.pvt_sheetAccessor = sheetAccessor;
    this.pvt_requestedAttributes = requestedAttributesSet.values;
    this.pvt_instanceOptions = instanceOptions;
    this.pvt_rowIndex = null;
    this.pvt_changedAttributes = null;
    this.pvt_dataPayload = {};

    this.pvt_requestedAttributes.forEach(attribute => {
      this.pvt_dataPayload[attribute] = this.pvt_sheetAccessor[attribute].getAllRecords();
    });
  }

  setRowIndex(rowIndex) {
    if (this.pvt_instanceOptions.writeLevel === WRITE_LEVEL_ROW) {
      if (this.pvt_rowIndex !== null) {
        this.writeCurrentRow();
      }
      this.pvt_rowIndex = rowIndex;
    }
    return this;
  }

  getColumnByIndex(attribute, columnIndex) {
    return this.pvt_dataPayload[attribute][this.pvt_rowIndex][columnIndex];
  }

  updateColumnByIndex(attribute, columnIndex, updatedValue) {
    this.pvt_dataPayload[attribute][this.pvt_rowIndex][columnIndex] = updatedValue;
    if (this.pvt_instanceOptions.writeLevel === WRITE_LEVEL_CELL) {
      this.pvt_sheetAccessor[attribute].setCell(this.pvt_rowIndex, columnIndex, [[updatedValue]]);
    } else {
      this.pvt_changedAttributes.push(attribute);
    }
    return this;
  }

  writeCurrentRow() {
    this.pvt_changedAttributes.forEach(attribute => {
      this.pvt_sheetAccessor[attribute].setRow(this.pvt_rowIndex, [
        this.pvt_dataPayload[attribute][this.pvt_rowIndex]
      ]);
    });
    this.pvt_changedAttributes.flush();
    return this;
  }

  capWrite() {
    if (this.pvt_instanceOptions.writeLevel === WRITE_LEVEL_TABLE) {
      this.pvt_changedAttributes.forEach(attribute => {
        this.pvt_sheetAccessor[attribute].setAllRecords(this.pvt_dataPayload[attribute]);
      });
      this.pvt_changedAttributes.flush();
    }
    if (this.pvt_instanceOptions.writeLevel === WRITE_LEVEL_ROW) {
      this.writeCurrentRow();
    }
  }
}
