import SheetAccessor from './sheet-accessor';
import QueryDriver from './query-driver';
import QueryReturn from './query-return';
import RowIndexCursor from './row-index-cursor';
import DataController from './data-controller';
import InstanceOptions from './instance-options';
import UniqueSet from './unique-set';

const TableProxy = () => {
  const instanceOptions = new InstanceOptions();
  instanceOptions.sheetName = 'Test';

  const requestedAttributesSet = new UniqueSet('value');
  const sheetAccessor = new SheetAccessor(instanceOptions);
  const rowIndexCursor = new RowIndexCursor(sheetAccessor);
  const dataController = new DataController(sheetAccessor, instanceOptions, requestedAttributesSet);

  const query = r => {
    let balls = 1;
    if (r.nuggets.value === r.nuggets.fontcolor) {
      balls = 5;
    }
    return balls;
  };

  const queryDriver = new QueryDriver(query, 'test');
  const queryReturn = new QueryReturn(queryDriver);

  const output = {
    dataController,
    instanceOptions,
    sheetAccessor,
    indices: rowIndexCursor.indices,
    queryDriver,
    queryReturn
  };

  const json = JSON.stringify(output);

  /*
   * return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
   */
  return () => {
    Browser.msgBox(json);
  };
};

global.TableProxy = TableProxy();
