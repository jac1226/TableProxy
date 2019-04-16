/**
 * Fake SpreadsheetApp for testing.
 * let sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');
 */

const SpreadsheetApp = {
    getActiveSpreadsheet: () => {
        return new ActiveSpreadsheet()
    }
}

class ActiveSpreadsheet {
    constructor() {
        this.sheets = {
            Test: new Sheet('Test')
        };
    }
    getSheetByName(name) {
        if (Object.keys(this.sheets).indexOf(name) == -1) {
            throw 'sheet named "' + name + '" does not exist.';
        }
        return this.sheets[name];
    }
}

class Sheet {
    constructor(name) {
        this.name = name;
        this.dataContainer = new DataContainer();
    }
    getRange(startRow, startColumn, numRows, numColumns) { //expects 1 indexed values
        try {
            return new Range(this, startRow, startColumn, numRows, numColumns);
        } catch (e) {
            throw 'getRange failed because of invalid inputs:' + e;
        }
    }
    getName(){
        return this.name;
    }
    getDataRange() {
        return new Range(this, 1, 1, this.dataContainer.getNumRows(), this.dataContainer.getNumColumns());
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
        this.shape = this.dataChunk.values.length + 'x' + this.dataChunk.values[0].length;
    }
    validateInputShape(input, type) {
        if (this.getShape(input) !== this.shape) {
            throw type + ' failed: range shape is ' + this.shape + ' and input is ' + this.getShape(input);
        }
    }
    getShape(input) {
        return input.length + 'x' + input[0].length;
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
    getFontColors() {
        return this.dataChunk.notes;
    }
    setFontColors(input) {
        this.validateInputShape(input, 'setNotes');
        this.dataChunk.values = input;
        this.dataContainer.setChunk('notes', this.dataChunk, this.startRow, this.startColumn);
        return this;
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
    getFontWeights(input) {
        this.validateInputShape(input, 'setFontWeights');
        this.dataChunk.values = input;
        this.dataContainer.setChunk('fontweights', this.dataChunk, this.startRow, this.startColumn);
        return this;
    }
}

class DataContainer { //get a copy of everything.
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
    filterDataArray(dataArrayName, startRow, startColumn, numRows, numColumns) { //one indexed

        if (this[dataArrayName] === undefined) {
            throw 'invalid dataset: "' + dataArrayName + '"';
        }
        if (!Number.isInteger(startRow)) {
            throw 'startRow must be an integer - received ' + startRow;
        }
        if (!Number.isInteger(startColumn)) {
            throw 'startColumn must be an integer - received ' + startColumn;
        }

        let dataArray = this[dataArrayName];

        if (numRows === undefined && numColumns === undefined) {
            numRows = 1;
            numColumns = 1;
        } else if (numRows !== undefined && numColumns === undefined) {
            numColumns = dataArray[0].length + 1 - startColumn;
        }

        if (startRow < 1 || startRow > dataArray.length) {
            throw 'startRow out of range for ' + dataArrayName + ': one-indexed startRow given as ' + startRow + ' - must be between 1 and ' + dataArray.length;
        }
        if (startColumn < 1 || startColumn > dataArray[0].length) {
            throw 'startColumn out of range for ' + dataArrayName + ': one-indexed startColumn given as ' + startColumn + ' - must be between 1 and ' + dataArray[0].length;
        }

        if ((startRow + numRows - 1) > dataArray.length) {
            throw 'numRows out of range for ' + dataArrayName + ' with startRow=' + startRow + ' - must be  between 1 and ' + (dataArray.length - startRow + 1);
        }
        if ((startColumn + numColumns - 1) > dataArray[0].length) {
            throw 'numColumns out of range for ' + dataArrayName + ' with startColumn=' + startColumn + ' - must be between 1 and ' + (dataArray[0].length - startColumn + 1);
        }

        return dataArray.filter((row, rowIndex) => {
            if ((rowIndex + 1) >= startRow && rowIndex <= (startRow + numRows - 2)) {
                return true;
            }
        }).map((row) => {
            return row.filter((column, columnIndex) => {
                if ((columnIndex + 1) >= startColumn && columnIndex <= (startColumn + numColumns - 2)) {
                    return true;
                }
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
        }
    }
    setChunk(dataAttribute, dataChunk, startRow, startColumn) {
        for (dataAttribute in dataChunk) {
            if (this[dataAttribute]) {
                dataChunk[dataAttribute].forEach((row, rowIndex) => {
                    row.forEach((columnValue, columnIndex) => {
                        this[dataAttribute][startRow - 1 + rowIndex][startColumn - 1 + columnIndex] = columnValue;
                    });
                });
            }
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

let values = [
    ['1-1 Value', '1-2 Value', '1-3 Value', '1-4 Value', '1-5 Value'],
    ['2-1 Value', '2-2 Value', '2-3 Value', '2-4 Value', '2-5 Value'],
    ['3-1 Value', '3-2 Value', '3-3 Value', '3-4 Value', '3-5 Value'],
    ['4-1 Value', '4-2 Value', '4-3 Value', '4-4 Value', '4-5 Value'],
    ['5-1 Value', '5-2 Value', '5-3 Value', '5-4 Value', '5-5 Value'],
    ['6-1 Value', '6-2 Value', '6-3 Value', '6-4 Value', '6-5 Value']

];
let backgrounds = [
    ['#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5', '#E5E5E5'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
];
let fontcolors = [
    ['#000000', '#000000', '#000000', '#000000', '#000000'],
    ['#000000', '#000000', '#000000', '#000000', '#000000'],
    ['#000000', '#000000', '#000000', '#000000', '#000000'],
    ['#000000', '#000000', '#000000', '#000000', '#000000'],
    ['#000000', '#000000', '#000000', '#000000', '#000000'],
    ['#000000', '#000000', '#000000', '#000000', '#000000']
];
let notes = [
    ['HEADER_ANCHOR', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];
let fontweights = [
    ['bold', 'bold', 'bold', 'bold', 'bold'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal']
];
let fontstyles = [
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal'],
    ['normal', 'normal', 'normal', 'normal', 'normal']
];
let fontsizes = [
    [12, 12, 12, 12, 12],
    [10, 10, 10, 10, 10],
    [10, 10, 10, 10, 10],
    [10, 10, 10, 10, 10],
    [10, 10, 10, 10, 10],
    [10, 10, 10, 10, 10]
];
let fontfamilies = [
    ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
    ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
    ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
    ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
    ['Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
    ['Arial', 'Arial', 'Arial', 'Arial', 'Arial']
];





sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');




