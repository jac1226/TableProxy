/**
 * Fake SpreadsheetApp for testing.
 * let sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');
 */

const values = [
  ['1-1 Value', '1-2 Value', '1-3 Value', '1-4 Value', '1-5 Value'],
  ['2-1 Value', '2-2 Value', '2-3 Value', '2-4 Value', '2-5 Value'],
  ['3-1 Value', '3-2 Value', '3-3 Value', '3-4 Value', '3-5 Value'],
  ['4-1 Value', '4-2 Value', '4-3 Value', '4-4 Value', '4-5 Value'],
  ['5-1 Value', '5-2 Value', '5-3 Value', '5-4 Value', '5-5 Value'],
  ['6-1 Value', '6-2 Value', '6-3 Value', '6-4 Value', '6-5 Value']
];
const backgrounds = [
  ['#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
];
const fontcolors = [
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000']
];
const notes = [
  ['', '', '', '', ''],
  ['', '', 'HEADER_ANCHOR', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];
const fontweights = [
  ['bold', 'bold', 'bold', 'bold', 'bold'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal']
];
const fontstyles = [
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal']
];
const fontsizes = [
  [12, 12, 12, 12, 12],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10]
];
const fontfamilies = [
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial']
];

class DataContainer {
  constructor() {
    this.values = values;
    this.backgrounds = backgrounds;
    this.fontcolors = fontcolors;
    this.notes = notes;
    this.fontweights = fontweights;
    this.fontstyles = fontstyles;
    this.fontsizes = fontsizes;
    this.fontfamilies = fontfamilies;
  }

  filterDataArray(dataArrayName, startRow, startColumn, numRows, numColumns) {
    if (this[dataArrayName] === undefined) {
      throw new Error(`invalid dataset: "${dataArrayName}"`);
    }
    if (!Number.isInteger(startRow)) {
      throw new Error(`startRow must be an integer - received ${startRow}.`);
    }
    if (!Number.isInteger(startColumn)) {
      throw new Error(`startColumn must be an integer - received ${startColumn}.`);
    }

    const dataArray = this[dataArrayName];
    let numRowsClean;
    let numColumnsClean;

    if (numRows === undefined && numColumns === undefined) {
      numRowsClean = 1;
      numColumnsClean = 1;
    } else if (numRows !== undefined && numColumns === undefined) {
      numColumnsClean = dataArray[0].length + 1 - startColumn;
    }

    if (startRow < 1 || startRow > dataArray.length) {
      throw new Error(
        `startRow out of range for ${dataArrayName}. Requested startRow ${startRow} - must be between 1 and ${
          dataArray.length
        }.`
      );
    }
    if (startColumn < 1 || startColumn > dataArray[0].length) {
      throw new Error(
        `startColumn out of range for ${dataArrayName}. Requested startColumn ${startColumn} - must be between 1 and ${
          dataArray[0].length
        }.`
      );
    }

    if (startRow + numRowsClean - 1 > dataArray.length) {
      throw new Error(
        `numRows out of range for ${dataArrayName}. For startRow ${startRow}, numRows must be  between 1 and ${dataArray.length -
          startRow +
          1}`
      );
    }

    if (startColumn + numColumnsClean - 1 > dataArray[0].length) {
      throw new Error(
        `numColumns out of range for ${dataArrayName}. For startColumn ${startColumn}, numColumns must be between 1 and ${dataArray[0]
          .length -
          startColumn +
          1}`
      );
    }

    return dataArray
      .filter((row, rowIndex) => {
        if (rowIndex + 1 >= startRow && rowIndex <= startRow + numRowsClean - 2) {
          return true;
        }
        return false;
      })
      .map(row => {
        return row.filter((column, columnIndex) => {
          if (columnIndex + 1 >= startColumn && columnIndex <= startColumn + numColumnsClean - 2) {
            return true;
          }
          return false;
        });
      });
  }

  getChunk(startRow, startColumn, numRows, numColumns) {
    return {
      values: this.filterDataArray('values', startRow, startColumn, numRows, numColumns),
      backgrounds: this.filterDataArray('backgrounds', startRow, startColumn, numRows, numColumns),
      fontcolors: this.filterDataArray('fontcolors', startRow, startColumn, numRows, numColumns),
      notes: this.filterDataArray('notes', startRow, startColumn, numRows, numColumns),
      fontweights: this.filterDataArray('fontweights', startRow, startColumn, numRows, numColumns),
      fontstyles: this.filterDataArray('fontstyles', startRow, startColumn, numRows, numColumns),
      fontsizes: this.filterDataArray('fontsizes', startRow, startColumn, numRows, numColumns),
      fontfamilies: this.filterDataArray('fontfamilies', startRow, startColumn, numRows, numColumns)
    };
  }

  setChunk(dataAttribute, dataChunk, startRow, startColumn) {
    if (this[dataAttribute]) {
      dataChunk[dataAttribute].forEach((row, rowIndex) => {
        row.forEach((columnValue, columnIndex) => {
          this[dataAttribute][startRow - 1 + rowIndex][
            startColumn - 1 + columnIndex
          ] = columnValue;
        });
      });
    }
    return this;
  }

  getNumRows() {
    return this.values.length;
  }

  getNumColumns() {
    return this.values[0].length;
  }
}

class Range {
  constructor(sheet, startRow, startColumn, numRows, numColumns) {
    this.sheet = sheet;
    this.dataContainer = sheet.dataContainer;
    this.dataChunk = this.dataContainer.getChunk(startRow, startColumn, numRows, numColumns);
    this.startRow = startRow;
    this.startColumn = startColumn;
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.shape = `${this.dataChunk.values.length}x${this.dataChunk.values[0].length}`;
  }

  validateInputShape(input, type) {
    const inputShape=`${input.length}x${input[0].length}`;
    if(inputShape !== this.shape) {
      throw new Error(
        `${type} failed: range shape is ${this.shape} and input is ${inputShape}`
      );
    }
  }

  getSheet() {
    return this.sheet;
  }

  getRow() {
    return this.startRow;
  }

  getRowIndex() {
    return this.startRow - 1;
  }

  getColumn() {
    return this.startColumn;
  }

  getColumnIndex() {
    return this.startColumn - 1;
  }

  getNumRows() {
    return this.numRows;
  }

  getNumColumns() {
    return this.numColumns;
  }

  getValues() {
    return this.dataChunk.values;
  }

  setValues(input) {
    this.validateInputShape(input, 'setValues');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('values', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getBackgrounds() {
    return this.dataChunk.backgrounds;
  }

  setBackgrounds(input) {
    this.validateInputShape(input, 'setBackgrounds');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('backgrounds', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getFontColors() {
    return this.dataChunk.fontcolors;
  }

  setFontColors(input) {
    this.validateInputShape(input, 'setFontColors');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('fontcolors', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getNotes() {
    return this.dataChunk.notes;
  }

  setNotes(input) {
    this.validateInputShape(input, 'setNotes');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('notes', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getFontFamilies() {
    return this.dataChunk.fontfamilies;
  }

  setFontFamilies(input) {
    this.validateInputShape(input, 'setFontFamilies');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('fontfamilies', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getFontSizes() {
    return this.dataChunk.fontsizes;
  }

  setFontSizes(input) {
    this.validateInputShape(input, 'setFontSizes');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('fontsizes', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getFontStyles() {
    return this.dataChunk.fontstyles;
  }

  setFontStyles(input) {
    this.validateInputShape(input, 'setFontStyles');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('fontstyles', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }

  getFontWeights() {
    return this.dataChunk.fontweights;
  }

  setFontWeights(input) {
    this.validateInputShape(input, 'setFontWeights');
    this.dataChunk.values = input;
    this.dataContainer.setChunk('fontweights', this.dataChunk, this.startRow, this.startColumn);
    return this;
  }
}

class Sheet {
  constructor(name) {
    this.name = name;
    this.dataContainer = new DataContainer();
  }

  getRange(startRow, startColumn, numRows, numColumns) {
    try {
      return new Range(this, startRow, startColumn, numRows, numColumns);
    } catch (e) {
      throw new Error(`getRange failed because of invalid inputs: ${e}`);
    }
  }

  getName() {
    return this.name;
  }

  getDataRange() {
    return new Range(
      this,
      1,
      1,
      this.dataContainer.getNumRows(),
      this.dataContainer.getNumColumns()
    );
  }
}

class ActiveSpreadsheet {
  constructor() {
    this.sheets = {
      Test: new Sheet('Test')
    };
  }

  getSheetByName(name) {
    if (Object.keys(this.sheets).indexOf(name) === -1) {
      throw new Error(`sheet named "${name}" does not exist.`);
    }
    return this.sheets[name];
  }
}

export default SpreadsheetApp = {
  getActiveSpreadsheet: () => {
    return new ActiveSpreadsheet();
  }
};
