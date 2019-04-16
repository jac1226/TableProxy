import {
  doGet
} from './server/webapp';
import './es6';
import UniqueSet from './unique-set';

const u = new UniqueSet(1, 2, 3, 4, 5, 5, 5, 5, '1');
Logger.log(JSON.stringify(u));

global.doGet = doGet;

global.sendmail = (email = 'amit@labnol.org') => {
  GmailApp.sendEmail(email, 'It works!', 'Hello Google Apps Script');
};
