import { doGet } from './server/webapp';
import './es6';
import './unique-set';
import './header-row-retriever';
import './simple-clone';


global.doGet = doGet;

global.sendmail = (email = 'amit@labnol.org') => {
  GmailApp.sendEmail(email, 'It works!', 'Hello Google Apps Script');
};
