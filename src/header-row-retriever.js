/**
 * HeaderRowRetriever - defines header row
 * @constructor HeaderRowRetriever
 * @return {HeaderRowRetriever}
 */

import { DEFAULT_HEADER_ANCHOR } from './CONSTANTS';

export default class HeaderRowRetriever {
  constructor(sheet, headerAnchorToken = DEFAULT_HEADER_ANCHOR) {
    this.sheet = sheet;
    this.headerAnchorToken = headerAnchorToken;
    this.anchorRowIndex = null;
    this.anchorColumnIndex = null;

    this.initialize();
  }

  initialize() {
    const notesData = this.sheet.getDataRange().getNotes();
    const rowCount = notesData.length;
    const columnCount = notesData[0].length;
    let anchorRowIndex;
    let anchorColumnIndex;

    for (let row = 0; row < rowCount; row += 1) {
      if (notesData[row].join('').indexOf(this.headerAnchorToken) !== -1) {
        anchorRowIndex = row;
        break;
      }
    }
    this.anchorRowIndex = anchorRowIndex === undefined ? 0 : anchorRowIndex;

    for (let column = 0; column < columnCount; column += 1) {
      if (notesData[anchorRowIndex][column].indexOf(this.headerAnchorToken) !== -1) {
        anchorColumnIndex = column;
        break;
      }
    }
    this.anchorColumnIndex = anchorColumnIndex === undefined ? 0 : anchorColumnIndex;
  }

  getHeaderRow() {
    return this.sheet.getRange(this.anchorRowIndex + 1, 1, 1).getValues()[0];
  }
}
