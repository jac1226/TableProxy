/**
 * Fake Stuff for testing
 */

import { IS_TEST_MODE } from './CONSTANTS';

const defaults = {};

defaults.values = '';
const values = [
  ['C1', 'C2', 'C3', 'C4', 'C5'],
  ['2-1 Value', '2-2 Value', '2-3 Value', '2-4 Value', '2-5 Value'],
  ['3-1 Value', '3-2 Value', '3-3 Value', '3-4 Value', '3-5 Value'],
  ['4-1 Value', '4-2 Value', '4-3 Value', '4-4 Value', '4-5 Value'],
  ['5-1 Value', '5-2 Value', '5-3 Value', '5-4 Value', '5-5 Value'],
  ['6-1 Value', '6-2 Value', '6-3 Value', '6-4 Value', '6-5 Value']
];

defaults.backgrounds = '#FFFFFF';
const backgrounds = [
  ['#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
];

defaults.fontcolors = '#000000';
const fontcolors = [
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000'],
  ['#000000', '#000000', '#000000', '#000000', '#000000']
];

defaults.notes = '';
const notes = [
  ['HEADER_ANCHOR', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

defaults.fontweights = 'normal';
const fontweights = [
  ['bold', 'bold', 'bold', 'bold', 'bold'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal']
];

defaults.fontstyles = 'normal';
const fontstyles = [
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal'],
  ['normal', 'normal', 'normal', 'normal', 'normal']
];

defaults.fontsizes = 10;
const fontsizes = [
  [12, 12, 12, 12, 12],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10]
];

defaults.fontfamilies = 'Arial';
const fontfamilies = [
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
  ['Arial', 'Arial', 'Arial', 'Arial', 'Arial']
];

const isInteger = input => {
  return input === parseInt(input, 10);
};

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

  filterDataArray(dataAttribute, startRow, startColumn, numRows, numColumns) {
    if (this[dataAttribute] === undefined) {
      throw new Error(`invalid dataset: "${dataAttribute}"`);
    }
    if (!isInteger(startRow)) {
      throw new Error(`startRow must be an integer - received ${startRow}.`);
    }
    if (!isInteger(startColumn)) {
      throw new Error(`startColumn must be an integer - received ${startColumn}.`);
    }
    if (numRows === undefined && numColumns !== undefined) {
      throw new Error(`numRows must be specified if numColumns is specified.`);
    }

    const dataArray = this[dataAttribute];
    const numRowsClean = numRows === undefined ? 1 : numRows; // this is wrong
    const numColumnsClean = numColumns === undefined ? 1 : numColumns;

    if (startRow < 1) {
      throw new Error(
        `startRow out of range for ${dataAttribute}. Requested startRow ${startRow} - must be >= 1.`
      );
    }
    if (startColumn < 1) {
      throw new Error(
        `startColumn out of range for ${dataAttribute}. Requested startColumn ${startColumn} - must be >= 1.`
      );
    }

    if (startRow - 1 + numRowsClean > dataArray.length) {
      const rowDelta = startRow - 1 + numRowsClean - dataArray.length;
      const columnCount = this[dataAttribute][0].length;
      for (let i = 0; i < rowDelta; i += 1) {
        const defaultRow = [];
        for (let j = 0; j < columnCount; j += 1) {
          defaultRow.push(defaults[dataAttribute]);
        }
        this[dataAttribute].push(defaultRow);
      }
    }

    if (startColumn - 1 + numColumnsClean > dataArray[0].length) {
      const columnDelta = startColumn - 1 + numColumnsClean - dataArray[0].length;
      this[dataAttribute].forEach((row, rowIndex) => {
        for (let i = 0; i < columnDelta; i += 1) {
          this[dataAttribute][rowIndex].push(defaults[dataAttribute]);
        }
      });
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
          this[dataAttribute][startRow - 1 + rowIndex][startColumn - 1 + columnIndex] = columnValue;
        });
      });
    }
    return this.trim();
  }

  trim() {
    let maxRowIndex = 0;
    let maxColumnIndex = 0;
    Object.keys(this).forEach(dataAttribute => {
      this[dataAttribute].forEach((row, rowIndex) => {
        row.forEach((columnValue, columnIndex) => {
          if (columnValue !== '') {
            maxRowIndex = Math.max(rowIndex, maxRowIndex);
            maxColumnIndex = Math.max(columnIndex, maxColumnIndex);
          }
        });
      });
    });
    Object.keys(this).forEach(dataAttribute => {
      this[dataAttribute] = this[dataAttribute].filter((row, rowIndex) => rowIndex <= maxRowIndex);
      this[dataAttribute] = this[dataAttribute].map(row =>
        row.filter((columnValue, columnIndex) => columnIndex <= maxColumnIndex)
      );
    });
    return this;
  }

  /*   sort(columnPosition, ascending) {
    
  } */

  insertRows(rowPosition, numRows, withDefaults) {
    Object.keys(this).forEach(dataAttribute => {
      const columnCount = this[dataAttribute][0].length;
      const argArray = [rowPosition - 1, 0];
      for (let i = 0; i < numRows; i += 1) {
        const newRow = [];
        for (let j = 0; j < columnCount; j += 1) {
          if (withDefaults === true) {
            newRow.push(defaults[dataAttribute]);
          }
          if (withDefaults !== true) {
            if (dataAttribute !== 'notes' && dataAttribute !== 'values') {
              newRow.push(this[dataAttribute][rowPosition - 1][j]);
            } else {
              newRow.push(defaults[dataAttribute]);
            }
          }
        }
        argArray.push(newRow);
      }
      Array.prototype.splice.apply(this[dataAttribute], argArray);
    });
    return this;
  }

  deleteRows(startRow, numRows) {
    if (startRow < 1) {
      throw new Error(`try deleting rows with position greater than 1...`);
    }
    Object.keys(this).forEach(dataAttribute => {
      this[dataAttribute].splice(startRow - 1, numRows);
    });
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
    const inputShape = `${input.length}x${input[0].length}`;
    if (inputShape !== this.shape) {
      throw new Error(`${type} failed: range shape is ${this.shape} and input is ${inputShape}`);
    }
  }

  getSheet() {
    return this.sheet;
  }

  getRow() {
    return this.startRow;
  }

  getRowIndex() {
    return this.startRow;
  }

  getColumn() {
    return this.startColumn;
  }

  getColumnIndex() {
    return this.startColumn;
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
    this.sheet.writeHtml();
    return this;
  }

  getBackgrounds() {
    return this.dataChunk.backgrounds;
  }

  setBackgrounds(input) {
    this.validateInputShape(input, 'setBackgrounds');
    this.dataChunk.backgrounds = input;
    this.dataContainer.setChunk('backgrounds', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }

  getFontColors() {
    return this.dataChunk.fontcolors;
  }

  setFontColors(input) {
    this.validateInputShape(input, 'setFontColors');
    this.dataChunk.fontcolors = input;
    this.dataContainer.setChunk('fontcolors', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }

  getNotes() {
    return this.dataChunk.notes;
  }

  setNotes(input) {
    this.validateInputShape(input, 'setNotes');
    this.dataChunk.notes = input;
    this.dataContainer.setChunk('notes', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }

  getFontFamilies() {
    return this.dataChunk.fontfamilies;
  }

  setFontFamilies(input) {
    this.validateInputShape(input, 'setFontFamilies');
    this.dataChunk.fontfamilies = input;
    this.dataContainer.setChunk('fontfamilies', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }

  getFontSizes() {
    return this.dataChunk.fontsizes;
  }

  setFontSizes(input) {
    this.validateInputShape(input, 'setFontSizes');
    this.dataChunk.fontsizes = input;
    this.dataContainer.setChunk('fontsizes', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }

  getFontStyles() {
    return this.dataChunk.fontstyles;
  }

  setFontStyles(input) {
    this.validateInputShape(input, 'setFontStyles');
    this.dataChunk.fontstyles = input;
    this.dataContainer.setChunk('fontstyles', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }

  getFontWeights() {
    return this.dataChunk.fontweights;
  }

  setFontWeights(input) {
    this.validateInputShape(input, 'setFontWeights');
    this.dataChunk.fontweights = input;
    this.dataContainer.setChunk('fontweights', this.dataChunk, this.startRow, this.startColumn);
    this.sheet.writeHtml();
    return this;
  }
}

class Sheet {
  constructor(name) {
    this.name = name;
    this.dataContainer = new DataContainer();
    this.div = null;
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

  deleteRows(rowPosition, numRows) {
    this.dataContainer.deleteRows(rowPosition, numRows);
    this.writeHtml();
    return this;
  }

  insertRows(rowPosition, numRows) {
    this.dataContainer.insertRows(rowPosition, numRows);
    this.writeHtml();
    return this;
  }

  setDiv(div) {
    if (toString.call(div) !== '[object HTMLDivElement]') {
      throw new TypeError(`setDiv requires a div element.`);
    }
    this.div = div;
    return this.writeHtml();
  }

  writeHtml() {
    if (toString.call(this.div) === '[object HTMLDivElement]') {
      this.div.innerHTML = this.getHtml();
    }
    return this;
  }

  getHtml() {
    let html = `<table style="border-collapse:collapse;border:1px solid black;">`;
    const rowCount = this.dataContainer.values.length;
    const columnCount = this.dataContainer.values[0].length;
    for (let i = 0; i < rowCount; i += 1) {
      html += `<tr>`;
      for (let j = 0; j < columnCount; j += 1) {
        html += `<td style="padding:5px;text-align:center;border:1px solid black;`;
        html += `background-color:${this.dataContainer.backgrounds[i][j]};`;
        html += `color:${this.dataContainer.fontcolors[i][j]};`;
        html += `font-family:${this.dataContainer.fontfamilies[i][j]};`;
        html += `font-size:${this.dataContainer.fontsizes[i][j]}px;`;
        html += `font-style:${this.dataContainer.fontstyles[i][j]};`;
        html += `font-weight:${this.dataContainer.fontweights[i][j]};`;
        html += `">${this.dataContainer.values[i][j]} `;
        if (this.dataContainer.notes[i][j] !== '') {
          html += `<a href=" " title="${this.dataContainer.notes[i][j]}">X</a>`;
        }
        html += `</td>`;
      }
      html += `</tr>`;
    }
    html += `</table>`;
    return html;
  }
}

class ActiveSpreadsheet {
  constructor(div) {
    this.div = div;
    this.sheets = {
      Test: new Sheet('Test')
    };
  }

  getActiveSheet() {
    return this.sheets.Test;
  }

  getSheetByName(name) {
    if (Object.keys(this.sheets).indexOf(name) === -1) {
      throw new Error(`sheet named "${name}" does not exist.`);
    }
    const sheet = this.sheets[name];
    if (toString.call(this.div) === '[object HTMLDivElement]') {
      sheet.setDiv(this.div);
    }
    return sheet;
  }
}

const SpreadsheetAppFake = {
  div: null,
  getActiveSpreadsheet: () => {
    return new ActiveSpreadsheet(SpreadsheetAppFake.div);
  }
};
export const expSpreadsheetApp = IS_TEST_MODE ? SpreadsheetAppFake : SpreadsheetApp;

const noop = () => {
  return null;
};
export const expNoop = noop;

const BrowserFake = {
  msgBox: note => {
    noop(note);
    // console.log(note);
  }
};
export const expBrowser = IS_TEST_MODE ? BrowserFake : Browser;

const LoggerFake = {
  log: note => {
    // noop(note);
    console.log(note);
  }
};
export const expLogger = IS_TEST_MODE ? LoggerFake : Logger;
