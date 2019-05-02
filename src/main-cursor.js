/**
 * MainCursor - fronts two UniqueIndexer objects
 * @desc This is the heart of selection state handling
 * @desc Under current implementation, there should be only be one MainCursor for a TableProxy Instance
 * @constructor MainCursor
 * @param {Object} sheetAccessor
 * @return {MainCursor}
 */

import { getTimeStamp, getTimeDiff } from './utilities';
import { Map } from './map-unique';
import SheetAccessor from './sheet-accessor';

export default class MainCursor {
  constructor(sheetAccessor) {
    if (!(sheetAccessor instanceof SheetAccessor)) {
      throw new TypeError('RowIndexCursor constructor accepts a SheetAccessor instance');
    }
    this.pvt_sheetAccessor = sheetAccessor;
    this.pvt_allRowIndexer = new Map(); /** this is the full set */
    this.pvt_selectedRowIndexer = new Map(); /** this is the selected */
    this.pvt_lastResetDataPullDuration = null; /** for performance curiosity */
    this.pvt_dirty = false;

    this.flush();
  }

  get indices() {
    return this.pvt_selectedRowIndexer.keys();
  }

  get isEmpty() {
    return this.pvt_selectedRowIndexer.empty;
  }

  get length() {
    return this.pvt_selectedRowIndexer.length;
  }

  get lastResetDataPullDuration() {
    return this.pvt_lastResetDataPullDuration;
  }

  get lastResetDataProcessingDuration() {
    return this.pvt_lastResetDataPullDuration;
  }

  get set() {
    return this.pvt_selectedRowIndexer.set;
  }

  setDirty() {
    this.pvt_dirty = true;
    return this;
  }

  flush() {
    this.pvt_selectedRowIndexer.clear().copyItems(this.pvt_allRowIndexer);
    return this.refreshSheetIndices().setDirty();
  }

  refreshSheetIndices() {
    const dataPullStartTime = getTimeStamp();
    this.pvt_lastResetDataPullDuration = getTimeDiff(dataPullStartTime);
    this.pvt_sheetAccessor.getAllRecordIndices().forEach(i => {
      this.pvt_allRowIndexer.set(i);
    });
    return this;
  }

  consumeSelection(selectionSet) {
    if (!(selectionSet instanceof Map)) {
      throw new TypeError('consumeSelections accepts only Map input.');
    }
    this.pvt_selectedRowIndexer.clear().copyItems(selectionSet);
    return this;
  }

  forEach(callback) {
    return this.pvt_selectedRowIndexer.forEach(callback);
  }
}
