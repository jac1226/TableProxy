/**
 * CONSTANTS - various constants
 */

export const IS_TEST_MODE = true;

export const DEFAULT_HEADER_ANCHOR = 'HEADER_ANCHOR';

export const TOP = 'TOP';
export const BOTTOM = 'BOTTOM';

export const WRITE_LEVEL_CELL = 'WRITE_LEVEL_CELL';
export const WRITE_LEVEL_ROW = 'WRITE_LEVEL_ROW';
export const WRITE_LEVEL_TABLE = 'WRITE_LEVEL_TABLE';
export const VALID_WRITE_LEVELS = [WRITE_LEVEL_CELL, WRITE_LEVEL_ROW, WRITE_LEVEL_TABLE];
export const DEFAULT_WRITE_LEVEL = WRITE_LEVEL_CELL;

export const COLORS = {
  SUCCESS: '#DFFFB4',
  FAILURE: '#FFB4B4',
  WARNING: '#FFDDB4',
  RED: 'red',
  red: 'red',
  WHITE: 'white',
  BLUE: 'blue',
  GREEN: 'green',
  ORANGE: 'orange',
  BLACK: 'black',
  GREY: 'grey',
  YELLOW: 'yellow',
  LIGHT_GREY: '#E5DEDE'
};

export const SUPPORTED_ATTRIBUTES = [
  'value',
  'background',
  'fontcolor',
  'note',
  'fontsize',
  'fontstyle',
  'fontfamily',
  'fontweight'
];

export const OP_UNIQUE = 'UNIQUE';
export const OP_QUERY = 'QUERY';
export const OP_UPDATE = 'UPDATE';
export const SUPPORTED_OPS = [OP_UNIQUE, OP_QUERY, OP_UPDATE];

export const DEFAULT_ATTRIBUTE = 'value';

export const INDEX = ' index ';
