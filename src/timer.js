/**
 * Timer/Logger
 * @return {Object}
 */

import { getTimeStamp, getTimeDiff, isString } from './utilities';
import { log } from './sheets-utilities';

export default class Timer {
  constructor(text) {
    if (!isString(text)) {
      throw new Error(`Timer requires text.`);
    }
    this.text = text;
    this.startTime = getTimeStamp();
    this.duration = null;
  }

  stop(text) {
    const endText = isString(text) ? `\n${text}` : '';
    this.duration = getTimeDiff(this.startTime, 0);
    log(`${this.text} operation completed in ${this.duration}ms${endText}`);
    return this.duration;
  }
}
