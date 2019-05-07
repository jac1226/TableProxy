/**
 * CONSTANTS - various constants
 */

// Test Toggle
export const IS_TEST_MODE = false;

// Row Indexing
export const $ = ' index ';

// Read Levels
export const RT = 'READ_LEVEL_TABLE';
export const RR = 'READ_LEVEL_ROW';

// Write Levels
export const WC = 'WRITE_LEVEL_CELL';
export const WR = 'WRITE_LEVEL_ROW';
export const WT = 'WRITE_LEVEL_TABLE';

// Positional
export const T = 'TOP';
export const B = 'BOTTOM';

// Data Attributes
export const AV = 'value';
export const AB = 'background';
export const AC = 'fontcolor';
export const AN = 'note';
export const AZ = 'fontsize';
export const AS = 'fontstyle';
export const AF = 'fontfamily';
export const AW = 'fontweight';
export const AD = 'numberformat';

// Canned formats for convenience
export const DS = 'mm/dd/yy';
export const DST = 'mm/dd/yy h:mm';
export const NINT = '#,##0';
export const NP1 = '#,##0.0';
export const NP2 = '#,##0.00';

// Canned colors for convenience
export const SUCCESS = '#DFFFB4';
export const FAILURE = '#FFB4B4';
export const WARNING = '#FFDDB4';
export const RED = 'red';
export const WHITE = 'white';
export const BLUE = 'blue';
export const GREEN = 'green';
export const ORANGE = 'orange';
export const BLACK = 'black';
export const GREY = 'grey';
export const YELLOW = 'yellow';
export const LIGHT_GREY = '#E5DEDE';

/**
 * Internal Usage
 */
export const INDEX_PROP = $;

export const READ_LEVEL_TABLE = RT;
export const READ_LEVEL_ROW = RR;
export const VALID_READ_LEVELS = [RT, RR];
export const DEFAULT_READ_LEVEL = RT;

export const WRITE_LEVEL_CELL = WC;
export const WRITE_LEVEL_ROW = WR;
export const WRITE_LEVEL_TABLE = WT;
export const VALID_WRITE_LEVELS = [WC, WR, WT];
export const DEFAULT_WRITE_LEVEL = WC;

export const SUPPORTED_ATTRIBUTES = [AV, AB, AC, AN, AZ, AS, AF, AW, AD];
export const DEFAULT_ATTRIBUTE = AV;
export const ATTR_NOTE = AN;

export const TOP = T;
export const BOTTOM = B;

export const OP_UNIQUE = 'UNIQUE';
export const OP_SELECT = 'SELECT';
export const OP_UPDATE = 'UPDATE';
export const OP_WRITE_RECORDS = 'WRITE_RECORDS';
export const SUPPORTED_OPS = [OP_UNIQUE, OP_SELECT, OP_UPDATE, OP_WRITE_RECORDS];
