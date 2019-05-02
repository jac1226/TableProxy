/**
 * MainCursor
 * @desc This is the heart of selection state handling
 * @desc Under current implementation, there should be only be one MainCursor for a TableProxy Instance
 * @constructor MainCursor
 * @return {MainCursor}
 */

import { Map } from './map-unique';
import SheetAccessor from './sheet-accessor';

export default class MainCursor extends Map {
  constructor(sheetAccessor) {
    super();
    if (!(sheetAccessor instanceof SheetAccessor)) {
      throw new TypeError(`MainCursor constructor requires a SheetAccessor.`);
    }
    this.sheetAccessor = sheetAccessor;
    this.dirty = true;
    this.flush();
  }

  get indices() {
    return this.keys();
  }

  setDirty() {
    this.dirty = true;
    return this;
  }

  setClean() {
    this.dirty = false;
    return this;
  }

  flush() {
    return this.clear()
      .setDirty()
      .copyItems(this.sheetAccessor.getAllRecordIndexer());
  }

  consumeSelection(selectionSet) {
    if (!(selectionSet instanceof Map)) {
      throw new TypeError('consumeSelections accepts only Map input.');
    }
    this.clear().copyItems(selectionSet);
    return this;
  }
}
