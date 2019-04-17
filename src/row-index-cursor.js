
 import './unique-set';
 import './sheet-access';

/**
  * RowIndexCursor - fronts two UniqueIndexer objects
  * @desc This is the heart of selection state handling
  * @desc Maintains data type on output - items stored as numbers are returned as numbers
  * @desc This is used to better maintain selection state
  * @desc Under current implementation, there should be only be one RowIndexCursor for a TableProxy Instance
  * @constructor RowIndexCursor
  * @param {Object} sheetRangeRetriever
  * @return {RowIndexCursor}
  */

  export default class RowIndexCursor {
    constructor(sheetRangeRetriever){
        if(!(sheetRangeRetriever instanceof SheetAccessor)){
            throw new TypeError('RowIndexCursor constructor accepts a SheetAccessor instance');
        }
        this._sheetRangeRetriever=sheetRangeRetriever;
        this._allRowIndexer=new UniqueSet(); /** this is the full set */
        this._selectedRowIndexer=new UniqueSet(); /** this is the selected */
        this._rowRangeFirstIndex=null; /** technically one indexed, but works because +1=>first row after the header */
        this._rowRangeLastIndex=null; /** this is the last row and must match zero-indexed getValues() pulls */
        this._lastResetDataPullDuration=null; /** for performance curiosity */
        this._lastResetDataProcessingDuration=null; /** for performance curiosity */
        
        this.flush();
    }
    get indices(){
        return this._selectedRowIndexer.values;
    }
    get isEmpty(){
        return this._selectedRowIndexer.isEmpty;
    }
    get length(){
        return this._selectedRowIndexer.values.length;
    }
    get lastResetDataPullDuration(){
        return this._lastResetDataPullDuration;
    }
    get lastResetDataProcessingDuration(){
        return this._lastResetDataPullDuration;
    }
    get push(){
        return this._selectedRowIndexer.push
    }
  }
 function RowIndexCursor(sheetRangeRetriever){
    classCallCheck(this,RowIndexCursor);

    /** indexers */
    var _allRowIndexer=new UniqueSet(); /** this is the full set */
    var _selectedRowIndexer=new UniqueSet(); /** this is the selected */

    /** cached indexes */
    var _rowRangeFirstIndex=null; /** technically one indexed, but works because +1=>first row after the header */
    var _rowRangeLastIndex=null; /** this is the last row and must match zero-indexed getValues() pulls */

    /** for performance curiosity */
    var _lastResetDataPullDuration=null;
    var _lastResetDataProcessingDuration=null;

    Object.defineProperties(this,{
      indices:{
        enumerable:true,
        get:function(){
          return _selectedRowIndexer.values
        }
      },
      push:{
        enumerable:true,
        get:function(){
          return _selectedRowIndexer.push
        }
      },
      isEmpty:{
        enumerable:true,
        value: _selectedRowIndexer.isEmpty
      },
      length:{
        enumerable:true,
        get:function(){
          return _selectedRowIndexer.values.length
        }
      },
      refreshSheetIndices:{
        enumerable:true,
        value:function(){
          var dataPullStartTime=getTimeStamp();

          var sheetDataRange=sheetRangeRetriever.getAllSheetData();
          var recordDataRange=sheetRangeRetriever.getAllRecordData();
          var newRowRangeFirstIndex=recordDataRange.getRow(); /** this is the first row after the header */
          var newRowRangeLastIndex=recordDataRange.getLastRow()+1; /** one indexed last row */

          _lastResetDataPullDuration=getTimeDiff(dataPullStartTime);
          var dataProcessigStartTime=getTimeStamp();

          /** test if row ranges have changed */
          if(newRowRangeFirstIndex!==_rowRangeFirstIndex ||
             newRowRangeLastIndex!==_rowRangeLastIndex){

            /** update if change detected */
            /** note: loop inequality takes care of zero indexing the last index */
            _allRowIndexer.flush();
            for(var i=newRowRangeFirstIndex;i<newRowRangeLastIndex;i++){
              _allRowIndexer.push(i);
            }
          }
          _lastResetDataProcessingDuration=getTimeDiff(dataProcessigStartTime);
        }
      },
      flush:{
        enumerable:true,
        value:function(){
          this.refreshSheetIndices();
          _selectedRowIndexer.flush().copyIndices(_allRowIndexer);
        }
      },
      consumeSelection:{
        enumerable:true,
        value:function(selectionSet){
        if(!isClass(selectionSet,UniqueSet)){throw new TypeError('consumeSelections accepts only UniqueSet input.');}

          _selectedRowIndexer.flush().copyIndices(selectionSet);
        return this;
        }
      },
      lastResetDataPullDuration:{
        enumerable:true,
        get:function(){
          return _lastResetDataPullDuration
        }
      },
      lastResetDataProcessingDuration:{
        enumerable:true,
        get:function(){
          return _lastResetDataProcessingDuration
        }
      },

    });

    //Initialize
    this.flush();

  }