
  /**
  * Returns a Record Proxy Builder Function
  * @desc Tests instanceOptions.columnFilter for validity
  * @param {Function} headerRowRetriever - Sheet Data Accessor Object (closed)
  * @param {Object} instanceOptions - TableProxy instance options (closed) - see mountSheet
  * @return {Function} Record Proxy Builder function
  */


class RecordProxy {
    constructor(headerRow,instanceOptions){

    }
}
 function getRecordProxyBuilder(headerRowRetriever,instanceOptions){

    var columnFilter=instanceOptions.columnFilter;
    columnFilter=isArray(columnFilter)?columnFilter:
    isString(columnFilter)?[columnFilter]:
    [];

    if(!isArray(columnFilter)){throw 'getRecordProxyBuilder called with invalid columnFilter.';}


    /**
    * Returns a recordProxy object
    * @desc Will not create property names for header row elements which are null (handles masking and null column headers)
    * @desc Allows for setting all supported attributes on cells
    * @desc Has access to headerRowRetriever, instanceOptions via getRecordProxyBuilder closure
    * @param {Array} requestedAttributes - Array of supported cell attributes
    * @param {Object} dataController - Data Controller Object
    * @return {Object} Record Proxy Object with dynamic getters/setters mapping to dataController
    */
    return function recordProxyBuilder(requestedAttributes,dataController){

      /**
      * Helper function to determine if a column is valid
      * @desc column names which are null or undefined are not valid
      * @param {string} column - column name
      * @return {boolean}
      */
      function columnIsValid(column){
        if(column===null||column===undefined){
          return false;
        }else if(columnFilter.length>0 && !inArray(column,columnFilter)){
          return false;
        }
        return true;
      }

      /** Begin creating recordProxy */
      var recordProxy={};

      /** Loop over columns */
      headerRowRetriever().forEach(function(column,columnIndex){

        /** Determine Validity */
        if(columnIsValid(column)){

          /** Begin creating column proxies */
          columnProxy={};

          /** Loop over all requested attributes and add attribute proxies */
          requestedAttributes.forEach(function(attribute){
            Object.defineProperty(columnProxy,attribute,{
              enumerable: true,
              get: function(){
                return dataController.getColumnByIndex(attribute,columnIndex);
              },
              set: function(value){
                return dataController.updateColumnByIndex(attribute,columnIndex,value);
              }
            });
          });
          recordProxy[column]=columnProxy;
        }
      });

      //add custom columns here


      return recordProxy;
    }

  }