## TableProxy

Use gas to perform various operations on your google sheets including queries and updates based on almost any data attribute that defines a Google sheet:

cell value (i.e. getValues/setValues)  
cell background (i.e. getBackgrounds/setBackgrounds)  
cell fontcolor (i.e. getFontColors/setFontColors)  
cell note (i.e. getNotes/setNotes)  
cell fontstyle (i.e. getFontStyles/setFontStyles)  
cell fontfamily (i.e. getFontFamilies/setFontFamilies)  
cell fontweight (i.e. getFontWeights/setFontWeights)  
cell fontsize (i.e. getFontSizes/setFontSizes)  
cell numberformat (i.e. getNumberFormats/setNumberFormats)  

Its essentially an ORM inspired by the needs of a personal project. [Similar utilities exist](https://github.com/itmammoth/Tamotsu).

## Core Methods 🚀

select  
update  
writeRecords  
writeCursor  
getRecords  
getUnique  
flush  
insertRow  
deleteRow  
getExportObject  
loadSelectedRows  
setRows  
getSelectedIndices  
getFullDataIndex  
getHeaderRow  
getOptions  
getLastResults  

## Instance Option Methods 🍿

setColumnFilter  
setExportAttributes  
exportWithAllAttributes  
setReadLevel (table / row)  
setWriteLevel (table / row / cell)  
setAutoResizeColumns  
setComputedProperties  
setIdColumnName  
setIdAttributeName  

## Bundled Utilities / Helpers ⚙️

getSheetsObjectType  
isSpreadsheet  
isSheet  
isRange  
isSupportedType  
getSelectedRowIndices  
sendEmail  
getSpreadsheet  
getSheetIndex  
getSheet  
getShape  
namedRangeExists  
getValueByName  
updateValueByName  
getCoordinatesByName  
getNamedRangesObject  
isDate1  
isArray  
isString  
isNumeric  
isFunction  
isObject  
isBoolean  
isNull  
isUndefined  
inArray  
getType  
toBool  
firstToUpper  
getTimeStamp  
getTimeDiff  
isJson  
toJson  
isEmail  
tokenInterpolate  
getTokens  
removeDuplicates  
getDuplicates  
testUnique  
strContains

## Bundled Objects 🎷

Map
UniqueSet
Timer

## About the Developer 👨🏼‍💻

jac1226 likes to build utilities.

#### Thanks To 🙏🏼

[Amit Agarwal](https://digitalinspiration.com/google-developer) for his [apps-script-starter] (https://github.com/labnol/apps-script-starter) which allowed me to write this in ES6.

#### License 📄

[MIT License](https://github.com/labnol/apps-script-starter/blob/master/LICENSE) (c) Jason Cascio

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
