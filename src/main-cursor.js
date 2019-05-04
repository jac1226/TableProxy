/**
 * MainCursor
 * @desc This is the heart of selection state handling
 * @desc Under current implementation, there should be only be one MainCursor for a TableProxy Instance
 * @constructor MainCursor
 * @return {MainCursor}
 */

import { Map } from './map-unique';
import SheetAccessor from './sheet-accessor';
import { AttributesSet } from './data-payload';
import QueryReturn from './query-return';

export default class MainCursor extends Map {
  constructor(sheetAccessor) {
    super();
    if (!(sheetAccessor instanceof SheetAccessor)) {
      throw new TypeError(`MainCursor constructor requires a SheetAccessor.`);
    }
    this.sheetAccessor = sheetAccessor;
    this.attributesSet = new AttributesSet();
    this.dirty = true;
    this.flush();
  }

  get indices() {
    return this.keys();
  }

  get isDirty() {
    return this.dirty;
  }

  flush() {
    this.attributesSet.flush();
    this.dirty = true;
    return this.clear().copyItems(this.sheetAccessor.getAllRecordIndexer());
  }

  consumeReturn(queryReturn) {
    if (!(queryReturn instanceof QueryReturn)) {
      throw new TypeError('consumeSelections accepts QueryReturn input.');
    }
    this.dirty = !queryReturn.returnWithRecords;
    this.attributesSet.copyValues(queryReturn.attributesSet);
    console.log(this.attributesSet.entries());
    this.clear().copyItems(queryReturn.resultSet);
    return this;
  }
}
