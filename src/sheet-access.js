/**
 * SheetAccessor - a class used to access ranges, and get/set attributes
 * @return {SheetAccessor}
 */

/*
import {
    DEFAULT_HEADER_ANCHOR
} from 'CONSTANTS.js'
*/

const DEFAULT_HEADER_ANCHOR = 'HEADER_ANCHOR';

//export default class SheetAccessor {
class SheetAccessor {
  constructor(sheet, headerAnchorToken) {
    this.range = new RangeAccessor(sheet, headerAnchorToken);
    this.value = new AttributeAccessor(this.rangeAccessor, 'Values');
    this.background = new AttributeAccessor(this.rangeAccessor, 'Backgrounds');
    this.fontcolor = new AttributeAccessor(this.rangeAccessor, 'FontColors');
    this.note = new AttributeAccessor(this.rangeAccessor, 'Notes');
    this.fontsize = new AttributeAccessor(this.rangeAccessor, 'FontSizes');
    this.fontstyle = new AttributeAccessor(this.rangeAccessor, 'FontStyles');
    this.fontfamily = new AttributeAccessor(this.rangeAccessor, 'FontFamilies');
    this.fontweight = new AttributeAccessor(this.rangeAccessor, 'FontWeights');
  }
}

class RangeAccessor {
  constructor(sheet, headerAnchorToken) {
    this.sheet = sheet;
    this.headerAnchorPosition = getHeaderAnchorPosition(sheet, headerAnchorToken);
  }
  getRowByOneIndex(rowIndex) {
    return this.sheet.getRange(parseInt(rowIndex), 1, 1, this.sheet.getDataRange().getNumColumns());
  }
  getRowByZeroIndex(rowIndex) {
    return this.sheet.getRange(
      parseInt(rowIndex) + 1,
      1,
      1,
      this.sheet.getDataRange().getNumColumns()
    );
  }
  getColumnByOneIndex(columnIndex, startRowIndex) {
    //untested
    startRowIndex =
      startRowIndex === null || startRowIndex === undefined
        ? this.headerAnchorPosition.headerAnchorRow + 2
        : parseInt(startRowIndex);
    return this.sheet.getRange(
      parseInt(startRowIndex),
      parseInt(columnIndex),
      this.sheet.getDataRange().getNumRows() - startRowIndex + 1,
      1
    );
  }
  getColumnByZeroIndex(columnIndex, startRowIndex) {
    startRowIndex =
      startRowIndex === null || startRowIndex === undefined
        ? this.headerAnchorPosition.headerAnchorRow + 1
        : parseInt(startRowIndex);
    return this.sheet.getRange(
      parseInt(startRowIndex) + 1,
      parseInt(columnIndex) + 1,
      this.sheet.getDataRange().getNumRows() - startRowIndex,
      1
    );
  }
  getCellByOneIndex(rowIndex, columnIndex) {
    return this.sheet.getRange(parseInt(rowIndex), parseInt(columnIndex));
  }
  getCellByZeroIndex(rowIndex, columnIndex) {
    return this.sheet.getRange(parseInt(rowIndex) + 1, parseInt(columnIndex) + 1);
  }
  getAllSheetData() {
    return this.sheet.getDataRange();
  }
  getAllRecordData() {
    return this.sheet.getRange(
      this.headerAnchorPosition.headerAnchorRow + 1,
      1,
      this.sheet.getDataRange().getNumRows() - this.headerAnchorPosition.headerAnchorRow - 1,
      this.sheet.getDataRange().getNumColumns()
    );
  }
}

class AttributeAccessor {
  constructor(rangeAccessor, attribute) {
    console.log(rangeAccessor);
    for (let methodKey in rangeAccessor) {
      console.log(rangeAccessor);
      let getMethodName = 'get' + methodKey.substr(3);
      let setMethodName = 'set' + methodKey.substr(3);
      this[getMethodName] = wrap(rangeAccessor[getMethodName], type, 'get');
      this[setMethodName] = wrap(rangeAccessor[getMethodName], type, 'set');
    }
  }
}

function wrap(specificRangeRetriever, type, action) {
  return function() {
    var argsArray = Array.prototype.slice.call(arguments);
    var range = specificRangeRetriever.apply(
      null,
      argsArray.splice(0, specificRangeRetriever.length)
    );
    if (argsArray.length === 0) {
      return range[action + typeToMethodNameMap[type]]();
    } else {
      return range[action + typeToMethodNameMap[type]](argsArray[0]);
    }
  };
}


SA = new SheetAccessor(sheet);
