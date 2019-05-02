import { IS_TEST_MODE } from './CONSTANTS';

const BrowserFake = {
  msgBox: note => console.log(note)
};

const exportB = IS_TEST_MODE ? BrowserFake : Browser;
export default exportB;
