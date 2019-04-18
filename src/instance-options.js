/**
 * InstanceOptions - instance options class
 * @return {InstanceOptions}
 */

 /*
import {
    DEFAULT_HEADER_ANCHOR
} from 'CONSTANTS.js'
*/

var WRITE_LEVEL_CELL='WRITE_LEVEL_CELL';
var WRITE_LEVEL_ROW='WRITE_LEVEL_ROW';
var WRITE_LEVEL_TABLE='WRITE_LEVEL_TABLE';
var DEFAULT_WRITE_LEVEL=WRITE_LEVEL_TABLE;
var WRITE_LEVELS=[WRITE_LEVEL_CELL,WRITE_LEVEL_ROW,WRITE_LEVEL_TABLE];

 class InstanceOptions {
    constructor(){
        this.sheetName=null;
        this.headerAnchorToken=null;
        this.columnFilter=[];
        this.exportAttributes=['value'];
        this.exportOnlySelected=false;
        this.writeLevel=DEFAULT_WRITE_LEVEL;
        this.autoResizeColumns=false;
        this.sheet=null;
        this.uniqueColumnId=null;
    }

    setSheetName(input){
        if(toString.call(input)!=='[object String]'){
            throw new TypeError('setSheetName accepts only string input.');
        }
        this.sheetName=input;
        try{
            this.sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(input);
        }catch(e){
            throw 'setSheetName exception: '+e;
        }
        return this;
    }

    setHeaderAnchorToken(input){
        if(toString.call(input)!=='[object String]'){
            throw new TypeError('setHeaderAnchorToken accepts only string input.');
        }
        this.headerAnchorToken=input;
        return this;
    }

    setColumnFilter(input){
        if(toString.call(input)!=='[object Array]'){
            throw new TypeError('setColumnFilter accepts only array input.');
        }
        this.columnFilter=input;
        return this;
    }

    setExportAttributes(input){
        if(toString.call(input)!=='[object Array]'){
            throw new TypeError('setExportAttributes accepts only array input.');
        }
        this.exportAttributes=input;
        return this;
    }

    setExportOnlySelected(input){
        if(toString.call(input)!=='[object Boolean]'){
            throw new TypeError('setExportOnlySelected accepts only array input.');
        }
        this.exportOnlySelected=input;
        return this;
    }

    setWriteLevel(input){
        if(toString.call(input)!=='[object String]'){
            throw new TypeError('setWriteLevel accepts only string input.');
        }
        if(WRITE_LEVELS.indexOf(input)==-1){
            throw 'setWriteLevel error: invalid write level value "'+input+'"';
        }
        this.writeLevel=input;
        return this;
    }

    setAutoResizeColumns(input){
        console.log(input);
        console.log(this);
        if(toString.call(input)!=='[object Boolean]'){
            throw new TypeError('setAutoResizeColumns accepts only array input.');
        }
        this.autoResizeColumns=input;
        return this;
    }
 }


 var a=function(){
    var I=new InstanceOptions();

    return {
        setAutoResizeColumns:I.setAutoResizeColumns.bind(I)
    }
 }