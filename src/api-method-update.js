import UniqueSet from './unique-set';
import processUniqueId from './process-unique-id';
import { getTimeStamp, getTimeDiff } from './utilities';


Object.defineProperty(api, 'testUniqueId', {
    enumerable: true,
    configurable: false,
    value: input => {
      const startTime = getTimeStamp();
      const uniqueId = processUniqueId(input);
      const columnIndex = sheetAccessor.getHeaderRow().indexOf(uniqueId.columnName);
      if (columnIndex === -1) {
        throw new Error(`uniqueIdColumnName ${uniqueId.columnName} is invalid.`);
      }
      const columnData = sheetAccessor[uniqueId.attribute]
        .getRecordsColumn(columnIndex)
        .map(i => {
          return i[0];
        });
      /**
       * Test column data
       * 1. Must be of ONLY one data type or indexing will not work - throw exception if not.
       * 2. Non-null values MUST be unique or indexing will be ambiguous - throw exception if not.
       */
      const uniqueNonBlankValues = new UniqueSet(columnData).remove('');
      if (!uniqueNonBlankValues.pure) {
        throw new Error(
          `multiple data types exist in ${
            uniqueId.columnName
          }: ${uniqueNonBlankValues.holds.toString()}`
        );
      }
      const nonBlankValueCount = columnData.filter(item => {
        return item !== '';
      }).length;

      if (uniqueNonBlankValues.length !== nonBlankValueCount) {
        throw new Error(`Duplicates detected: non-blank values are not unique.`);
      }

      Logger.log(
        `setUniqueIdColumn for sheet ${instanceOptions.sheetName} completed in ${getTimeDiff(
          startTime
        )}ms`
      );
      return true;
    }
  });