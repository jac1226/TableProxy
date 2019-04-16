import { doGet } from './server/webapp';
import './es6';
import UniqueSet from './unique-set';

global.doGet = doGet;

global.sendmail = (email = 'amit@labnol.org') => {
  GmailApp.sendEmail(email, 'It works!', 'Hello Google Apps Script');
};

let u = new UniqueSet(1, 2, 3, 4, 4, 4, 4);
Logger.log(JSON.stringify(u));
