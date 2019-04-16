import { doGet } from './server/webapp';
import './es6';
import './unique-set';
import {
  isArray,
  isString,
  isNumeric,
  isFunction,
  isObject,
  isBoolean,
  inArray,
  toBool,
  firstToUpper,
  getTimeStamp,
  getTimeDiff,
  isValidColor
} from './utilities';

global.doGet = doGet;

global.sendmail = (email = 'amit@labnol.org') => {
  GmailApp.sendEmail(email, 'It works!', 'Hello Google Apps Script');
};
