/**
  * DataController class
  * @param {Object} sheetDataAccessor - Sheet Data Accessor object (closed)
  * @param {Object} instanceOptions - TableProxy instance options (closed)- see mountSheet
  */

class DataController {
  constructor(sheetAccessor, requestedAttributes, instanceOptions){
    this.rowIndex = null;
    this.changedAttributes = null;
    this.dataPayload = {};

    requestedAttributes.forEach(attribute => {
      this.dataPayload[attribute]=sheetAccessor[attribute].getAllRecords();
    });
  }

  setRowIndex(rowIndex) {
    if(instanceOptions.writeLevel===WRITE_LEVEL_ROW){
      if(this.rowIndex!==null){
        this.writeCurrentRow();
      }
      this.rowIndex=rowIndex;
      return this;
    }
  }

  getColumnByIndex(attribute,columnIndex) {
    return this.dataPayload[attribute][this.rowIndex][columnIndex];
  }

  updateColumnByIndex(attribute, columnIndex, updatedValue) {
    this.dataPayload[attribute][this.rowIndex][columnIndex]=updatedValue;
    if(instanceOptions.writeLevel===WRITE_LEVEL_CELL){
      sheetAccessor[attribute].setCell(this.rowIndex, columnIndex, [[updatedValue]]);
    }else{
      this.changedAttributes.push(attribute);
    }
    return this;
  }

  writeCurrentRow() {
      this.changedAttributes.forEach(attribute => {
        sheetAccessor[attribute].setRow(self.rowIndex, [this.dataPayload[attribute][this.rowIndex]]);
      });
      this.changedAttributes.flush();
      return this;
  }

  capWrite() {
    if(instanceOptions.writeLevel===WRITE_LEVEL_TABLE){
      this.changedAttributes.forEach(attribute => {
        sheetAccessor[attribute].setAllRecords(this.dataPayload[attribute]);
      });
      this.changedAttributes.flush();
    }
    if(instanceOptions.writeLevel===WRITE_LEVEL_ROW){
      this.writeCurrentRow();
    }
  }
 }
