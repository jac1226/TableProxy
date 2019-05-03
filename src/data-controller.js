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

    this.sheetAccessor = sheetAccessor;
    this.instanceOptions = instanceOptions;
    this.rowIndex = null;
    this.changedAttributes = new AttributesSet();
    this.dataPayload = sheetAccessor.getDataPayload(requestedAttributesSet);
    console.log('shit');
    console.log(this.dataPayload);
  }

  getColumnByIndex(attribute, columnIndex) {
    return this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex];
  }

  updateColumnByIndex(attribute, columnIndex, updatedValue) {
    this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex] = updatedValue;
    if (this.instanceOptions.writeLevel === WRITE_LEVEL_CELL) {
      this.sheetAccessor[attribute].setCell(this.rowIndex, columnIndex, [[updatedValue]]);
    } else {
      this.changedAttributes.push(attribute);
    }
    return this;
  }

  setRowIndex(rowIndex) {
    if (this.instanceOptions.writeLevel === WRITE_LEVEL_ROW && this.rowIndex !== null) {
      this.writeCurrentRow();
    }
    this.rowIndex = rowIndex;
    return this;
  }

  getRowIndex() {
    return this.rowIndex;
  }

  writeCurrentRow() {
    this.changedAttributes.forEach(attribute => {
      this.sheetAccessor[attribute].setRow(this.rowIndex, [
        this.dataPayload.dataObject[attribute][this.rowIndex]
      ]);
    });
    this.changedAttributes.flush();
    return this;
  }

  capWrite() {
    if (this.instanceOptions.writeLevel === WRITE_LEVEL_TABLE) {
      this.changedAttributes.forEach(attribute => {
        this.dataPayload.dataObject[attribute].splice(0, this.sheetAccessor.headerRowIndex + 1);
        this.sheetAccessor[attribute].setAllRecords(this.dataPayload.dataObject[attribute]);
      });
      this.changedAttributes.flush();
    }
    if (this.instanceOptions.writeLevel === WRITE_LEVEL_ROW) {
      this.writeCurrentRow();
    }
  }
}
