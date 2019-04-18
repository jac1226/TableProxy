/**
* Query Return Object
* @return {Object}
*/

import { getTimeStamp } from './utilities';
import UniqueSet from './unique-set';
import QueryDriver from './query-driver'

function QueryResult {
    constructor(queryDriver){
        if(!(queryDriver instanceof QueryDriver)){
            throw new TypeError('QueryResult constructor requires QueryDriver input.');
        }
        this.resultSet = new UniqueSet();
        this.type=queryDriver.type;
        this.returnContainer = {
            records: {},
            errors:[]
        }
        this.queryStartTime=
    }

    push(input){

    }

    get count(){

    }

    get



    

    this.query = queryDriver.query;
    this.type = queryDriver.type;
    this.returnContainer = {
        records: {},
        errors: []
    };

    Object.defineProperties(this, {
        push: {
            enumerable: true,
            value: function (input) {
                this.resultSet.push(input);
                return this;
            }
        },
        count: {
            enumerable: true,
            get: function () {
                return this.resultSet.length;
            }
        },
        queryStartTime: {
            enumerable: false,
            writable: false,
            value: (getTimeStamp())
        }
    });



    this.queryDuration = null;
    this.done = function () {
        this.queryDuration = getTimeDiff(this.queryStartTime);
        Logger.log(this.type + ' operation completed in ' + this.queryDuration + 'ms.\n' + this.query.toString());

        return this;
    }

}
