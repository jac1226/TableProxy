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
    this.sheetAccessor = sheetAccessor;
    this.allRowIndexer = new UniqueSet(); /** this is the full set */
    this.selectedRowIndexer = new UniqueSet(); /** this is the selected */
    this.lastResetDataPullDuration = null; /** for performance curiosity */

    this.flush();
  }

  get indices() {
    return this.selectedRowIndexer.values;
  }

  get isEmpty() {
    return this.selectedRowIndexer.isEmpty;
  }

  get length() {
    return this.selectedRowIndexer.length;
  }

  get lastResetDataPullDuration() {
    return this.lastResetDataPullDuration;
  }

  get lastResetDataProcessingDuration() {
    return this.lastResetDataPullDuration;
  }

  get push() {
    return this.selectedRowIndexer.push;
  }

  flush() {
    this.refreshSheetIndices();
    this.selectedRowIndexer.flush().copyIndices(this.allRowIndexer);
    return this;
  }

  refreshSheetIndices() {
    const dataPullStartTime = getTimeStamp();
    const sheetRecordIndices = this.sheetAccessor.getAllRecordIndices();
    this.lastResetDataPullDuration = getTimeDiff(dataPullStartTime);
    this.allRowIndexer.flush().push(sheetRecordIndices);
    return this;
  }

  consumeSelection(selectionSet) {
    if (!(selectionSet instanceof UniqueSet)) {
      throw new TypeError('consumeSelections accepts only UniqueSet input.');
    }
    this.selectedRowIndexer.flush().copyItems(selectionSet);
    return this;
  }
}
