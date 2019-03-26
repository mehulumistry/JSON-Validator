// Import stylesheets
import './style.css';
// ts-check 
/* Types for how data comes in */

// "target": "es7"
// interfaces

interface DummyDataPoint {
    value: number
    range: Date
    json?: DataPointJSON
}
                                
interface ErrorJSON {
    [errorName: string] : number
}

interface FailureJSON {
    [failureName: string] : string[]
}

interface JSONWithMeta<T extends {}> {
    data: T
    meta: JSONMeta
}
interface JSONMeta {
    keys: string[]
    count: number
    range?: { min: number, max: number }
    total?: number
    average?: number
}
type ErrorJSONWithMeta = JSONWithMeta<ErrorJSON>
type FailureJSONWithMeta = JSONWithMeta<FailureJSON>

interface DataPointJSON {
    error: ErrorJSONWithMeta,
    failure: FailureJSONWithMeta
}

// Function Declerations

function isErrorsJSON(errorsJson: ErrorJSON){
    let jsonEnteries = Object.entries(errorsJson);
    for(let [ key, value ] of jsonEnteries){
      if(typeof key !== "string" || typeof value !== "number"){
        return false;
      }
    }
    return true;
}

function isFailureJSON(failureJSON: FailureJSON){
    let jsonEnteries = Object.entries(failureJSON);
    for(let [ key, value ] of jsonEnteries){
      if(typeof key !== "string" || typeof !Array.isArray(value)){
        return false;
      }
    }
    return true;
}

function getErrorJSONMeta(errorsJson: ErrorJSON): JSONMeta{

    // process the errorsJSON and get below values

    let errorJsonKeys = Object.keys(errorsJson);
    let errorJsonValues = Object.values(errorsJson);
    let errorCount:number = errorJsonKeys.length;
    let errorRange = { min: 0, max: 0};
    let errorTotal:number = 0;
    let errorAverage:number = 0;

    errorJsonValues.reduce((accumulator,currentVal) => {
      errorCount += accumulator;
      return accumulator;
    },0);

    errorAverage = errorTotal / errorCount;

    let meta: JSONMeta = {
        keys: errorJsonKeys,
        count: errorCount,
        range: errorRange,
        total: errorTotal,
        average: errorAverage
    };
    return meta
}

function getFailureJSONMeta(failureJson: FailureJSON): JSONMeta{

    let failureJsonKeys = Object.keys(failureJson);
    let failureJsonValues = Object.values(failureJson);
    let failureCount:number = failureJsonKeys.length;
    let failureRange = { min: 0, max: 0};
    let failureTotal:number = 0;
    let failureAverage:number = 0;

   failureJsonValues.reduce((accumulator,currentVal) => {
     failureCount += accumulator;
      return accumulator;
    },0)

    let meta: JSONMeta = {
        keys: failureJsonKeys,
        count: failureCount,
        range: failureRange,
        total: failureTotal,
        average: failureAverage
    }
    return meta
}




// Driver

/* We Create This Structure */

// Raw Json
let rawErrorsJson = {
    'FLP': 5,
    'TP': 9,
    'HP': 2
}

let errorsJson = isErrorsJSON(rawErrorsJson) ? rawErrorsJson as ErrorJSON : {};

let failureJson: FailureJSON = {
    'Overheated': ['FLP']
}

let d: DummyDataPoint = {
    value: 2,
    range: new Date(),
    json: {
        error: {
            data: errorsJson,
            meta: getErrorJSONMeta(errorsJson)
        },
        failure: {
            data: failureJson,
            meta: getFailureJSONMeta(failureJson)
        }
    }
}

console.log("d",d);





