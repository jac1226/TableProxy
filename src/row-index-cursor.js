/**
 * RowIndexCursor - fronts two UniqueIndexer objects
 * @desc This is the heart of selection state handling
 * @desc Under current implementation, there should be only be one RowIndexCursor for a TableProxy Instance
 * @constructor RowIndexCursor
 * @param {Object} sheetAccessor
 * @return {RowIndexCursor}
 */

import { getTimeStamp, getTimeDiff } from './utilities';
import UniqueSet from './unique-set';
import SheetAccessor from './sheet-accessor';

export default class RowIndexCursor {
  constructor(sheetAccessor) {
    if (!(sheetAccessor instanceof SheetAccessor)) {
      throw new TypeError('RowIndexCursor constructor accepts a SheetAccessor instance');
    }
    this.pvt_sheetAccessor = sheetAccessor;
    this.pvt_allRowIndexer = new UniqueSet(); /** this is the full set */
    this.pvt_selectedRowIndexer = new UniqueSet(); /** this is the selected */
    this.pvt_lastResetDataPullDuration = null; /** for performance curiosity */

    this.flush();
  }

  get indices() {
    return this.pvt_selectedRowIndexer.values;
  }

  get isEmpty() {
    return this.pvt_selectedRowIndexer.isEmpty;
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

  get push() {
    return this.pvt_selectedRowIndexer.push;
  }

  flush() {
    this.refreshSheetIndices();
    this.pvt_selectedRowIndexer.flush().copyItems(this.pvt_allRowIndexer);
    return this;
  }

  refreshSheetIndices() {
    const dataPullStartTime = getTimeStamp();
    const sheetRecordIndices = this.pvt_sheetAccessor.getAllRecordIndices();
    this.pvt_lastResetDataPullDuration = getTimeDiff(dataPullStartTime);
    this.pvt_allRowIndexer.flush().push(sheetRecordIndices);
    return this;
  }

  consumeSelection(selectionSet) {
    if (!(selectionSet instanceof UniqueSet)) {
      throw new TypeError('consumeSelections accepts only UniqueSet input.');
    }
    this.pvt_selectedRowIndexer.flush().copyItems(selectionSet);
    return this;
  }

  forEach(callback) {
    return this.pvt_selectedRowIndexer.forEach(callback);
  }
}
