/**
  * Fake SpreadsheetApp for testing.
  */
 SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetOrSheetName)


  let values=[
    ['Field 1','Field 2','Field 3','Field 4','Field 5'],
    ['1-1 Value','1-2 Value','1-3 Value','1-4 Value','1-5 Value'],
    ['2-1 Value','2-2 Value','2-3 Value','2-4 Value','2-5 Value'],
    ['3-1 Value','3-2 Value','3-3 Value','3-4 Value','3-5 Value'],
    ['4-1 Value','4-2 Value','4-3 Value','4-4 Value','4-5 Value'],
  ];
  let notes=[
    ['HEADER_ANCHOR','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
  ];
  let backgrounds=[
    ['#E5E5E5','#E5E5E5','#E5E5E5','#E5E5E5','#E5E5E5'],
    ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'],
    ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'],
    ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'],
    ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'],
  ];


  class Data {
      constructor(){
        this.values=values.filter(()=>true); //copy
        this.notes=notes.filter(()=>true); //copy
        this.backgrounds=backgrounds.filter(()=>true); //copy
      }
  }

  class Range {
    constructor(sheet,startRow,startColumn,endRow,endColumn){
        this.sheet=sheet;
        this._startRow=startRow;
        this._startColumn=startColumn;
        this._endRow=endRow;
        this._endColumn=endColumn;
    }
    getValues(){

    }
    setValues(){

    }
    getRow(){

    }
    getColumn(){

    }
    getNumRows(){

    }
    getNumColumns(){

    }
  }




  class Sheet {
    constructor(name){
        this.name=name;
        this.data=new Data();
    }
    getRange(startRow,startColumn,endRow,endColumn){ //expects 1 indexed values
        if(startRow<1||startColumn<1){
            throw 'out of range';
        }

        startRow--;
        startColumn--;

        if(toString.call(endRow)==='[object Number]'){
            if(endRow<startRow){
                throw 'endRow out of range: "'+endRow;
            }else{
                endRow--;
            }
        }else if(toString.call(endRow)==='[object Undefined]'){
            endRow=this.data.values.length-1;
        }else{
            throw new TypeError('endRow cannot be a "'+(typeof endRow)+'"');
        }

        if(toString.call(endColumn)==='[object Number]'){
            if(endColumn<startColumn){
                throw 'endColumn out of range: "'+endColumn;
            }else{
                endColumn--;
            }
        }else if(toString.call(endColumn)==='[object Undefined]'){
            endColumn=this.data.values[0].length-1;
        }else{
            throw new TypeError('endColumn cannot be a "'+(typeof endColumn)+'"');
        }

        return new Range(this,startRow,startColumn,endRow,endColumn);

    }
    getDataRange(){
        
        return new Range(this,startRow,startColumn,endRow,endColumn);

    }

}



  class ActiveSpreadsheet {
    constructor(){
        this.sheets={
            Test:new Sheet('Test')
        };
    }
    getSheetByName(name){
        if(Object.keys(this.sheets).indexOf(name)==-1){
           throw 'sheet named "'+name+'" does not exist.';
        }
        return this.sheets[name];
    }
  }   

  class SpreadsheetApp {
      constructor(){}
      getActiveSpreadsheet(){
          return new ActiveSpreadsheet();
      }
  }





 function getSheetRangeRetriever(sheet,headerAnchorPosition){
   return {
     getRowByOneIndex:function(rowIndex){
       return sheet.getRange(parseInt(rowIndex),1,1,sheet.getDataRange().getNumColumns());
     },
     getRowByZeroIndex:function(rowIndex){
       return sheet.getRange((parseInt(rowIndex)+1),1,1,sheet.getDataRange().getNumColumns());
     },
     getColumnByOneIndex:function(columnIndex,startRowIndex){//untested
       startRowIndex=(startRowIndex===null||startRowIndex===undefined)?headerAnchorPosition.headerAnchorRow+2:parseInt(startRowIndex);
       return sheet.getRange(parseInt(startRowIndex),parseInt(columnIndex),sheet.getDataRange().getNumRows()-startRowIndex+1,1);
     },
     getColumnByZeroIndex:function(columnIndex,startRowIndex){
       startRowIndex=(startRowIndex===null||startRowIndex===undefined)?headerAnchorPosition.headerAnchorRow+1:parseInt(startRowIndex);
       return sheet.getRange((parseInt(startRowIndex)+1),(parseInt(columnIndex)+1),sheet.getDataRange().getNumRows()-startRowIndex,1);
     },
     getCellByOneIndex:function(rowIndex,columnIndex){
       return sheet.getRange(parseInt(rowIndex),parseInt(columnIndex));
     },
     getCellByZeroIndex:function(rowIndex,columnIndex){
       return sheet.getRange(parseInt(rowIndex)+1,parseInt(columnIndex)+1);
     },
     getAllSheetData:function(){
       return sheet.getDataRange();
     },
     getAllRecordData:function(){
       return sheet.getRange(headerAnchorPosition.headerAnchorRow+1,1,sheet.getDataRange().getNumRows()-headerAnchorPosition.headerAnchorRow-1,sheet.getDataRange().getNumColumns());
     }
   }
 }














  function getSheetsObjectType(input) {
    var type=typeof(input);
    if(type==="object") {
      try{
        type=input.getGibberish(); //dummy method, throws error
      }catch(e){
        type=e.message.split(" object ")[1].replace('.',''); //extract type from error
      }
    }
    return type;
  }

  /**
  * Tests if input is a sheets Sheet object ytpe
  * @param {Object} input - The object to be tested
  * @return {boolean}
  */
  function isSheet(input){
    return getSheetsObjectType(input)==='Sheet'?true:false;
  }

  /**
  * Tests if input is a sheets Range object ytpe
  * @param {Object} input - The object to be tested
  * @return {boolean}
  */
  function isRange(input){
    return getSheetsObjectType(input)==='Range'?true:false;
  }

  /**
  * Tries to return a google sheets Sheet object from a Sheet or sheet name string
  * @param {(Object|string)} sheetOrSheetName - The object/string input
  * @return {Object} - google sheets Sheet
  */
  function getSheet(sheetOrSheetName){
    if(isSheet(sheetOrSheetName)){
      return sheetOrSheetName;
    }else if(isString(sheetOrSheetName)){
      var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetOrSheetName);
      if(!sheet){
        throw 'getSheet was unable to find a sheet with name "'+sheetName+'".';
      }
      return sheet;
    }else{
      throw new TypeError('getSheet called with invalid sheetOrSheetName data type: "'+getSheetsObjectType(sheetOrSheetName)+'".');
    }
  }