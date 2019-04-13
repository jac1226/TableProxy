import { doGet } from './server/webapp';
import './es6';

global.doGet = doGet;

global.sendmail = (email = 'jcascio1226@gmail.com') => {
  GmailApp.sendEmail(email, 'It works!', 'Hello Google Apps Script');
};
