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

function isErrorsJSON(errorsJson: any){
    let jsonEnteries = Object.entries(errorsJson);
    for(let [ key, value ] of jsonEnteries){
      if(typeof key !== "string" || typeof value !== "number"){
        return false;
      }
    }
    return true;
}

function isFailureJSON(failureJSON: any){
    let jsonEnteries = Object.entries(failureJSON);
    for(let [ key, value ] of jsonEnteries){
      if(typeof key !== "string" || typeof !Array.isArray(value)){
        return false;
      }
    }
    return true;
}

function getErrorJSONMeta(errorsJson: ErrorJSON): JSONMeta{

    let errorJsonKeys = Object.keys(errorsJson);
    let errorJsonValues = Object.values(errorsJson);
    let errorCount:number = errorJsonKeys.length;
    let errorRange = { min: Math.min(...errorJsonValues), max: Math.max(...errorJsonValues) };
    let errorTotal:number = 0;
    let errorAverage:number = 0;

    errorJsonValues.reduce((accumulator,currentVal) => {
      errorTotal += accumulator;
      return currentVal;
    },0);

    errorAverage = Math.round(errorTotal / errorCount);

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
    let failureCount:number = failureJsonKeys.length;

    let meta: JSONMeta = {
        keys: failureJsonKeys,
        count: failureCount
    }
    return meta
}


// Driver

let rawErrorsJson: any = {
    'FLP': 5,
    'TP': 9,
    'HP': 2
}

let rawFailureJson: any = {
    'Overheated': ['FLP']
}


let errorsJson: ErrorJSON = isErrorsJSON(rawErrorsJson) ? rawErrorsJson as ErrorJSON : {};
let failureJson: FailureJSON = isFailureJSON(rawFailureJson) ? rawFailureJson as FailureJSON : {};


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





