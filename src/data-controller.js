/**
 * DataController class
 * @param {Object} sheetAccessor - SheetAccessor instance
 * @param {Object} instanceOptions - InstanceOptions instance
 * @param {Object} requestedAttributes - UniqueSet instance
 */

import SheetAccessor from './sheet-accessor';
import InstanceOptions from './instance-options';
import { AttributesSet } from './data-payload';
import { WRITE_LEVEL_CELL, WRITE_LEVEL_ROW, WRITE_LEVEL_TABLE } from './CONSTANTS';

export default class DataController {
  constructor(sheetAccessor, instanceOptions, requestedAttributesSet) {
    if (!(sheetAccessor instanceof SheetAccessor)) {
      throw new TypeError(`DataController requires an instance of InstanceOptions object.`);
    }
    if (!(instanceOptions instanceof InstanceOptions)) {
      throw new TypeError(`DataController requires an instance of InstanceOptions object.`);
    }
    if (!(requestedAttributesSet instanceof AttributesSet) || requestedAttributesSet.length < 1) {
      throw new TypeError(
        `DataController requires a RequestedAttributesSet instance containing at least one attribute.`
      );
    }

    this.pvt_sheetAccessor = sheetAccessor;
    this.pvt_instanceOptions = instanceOptions;
    this.pvt_rowIndex = null;
    this.pvt_changedAttributes = new AttributesSet();
    this.pvt_dataPayload = sheetAccessor.getDataPayload(requestedAttributesSet);
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

  setRowIndex(rowIndex) {
    if (this.pvt_instanceOptions.writeLevel === WRITE_LEVEL_ROW && this.pvt_rowIndex !== null) {
      this.writeCurrentRow();
    }
    this.pvt_rowIndex = rowIndex;
    return this;
  }

  getRowIndex() {
    return this.pvt_rowIndex;
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
