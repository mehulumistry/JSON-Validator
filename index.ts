// Import stylesheets
import './style.css';

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
    
    jsonEnteries.map(function(data) {
      console.log(data[0],data[1]);

    })

/**
 * 
 * Object.enteries(errorsJson).map(data => {
 * 
 * typeof data[0] === "string"
 * typeof data[1] === "number"
 * 
 * if not return false 
 * else return true
 * 
 * */
}

function isFailureJSON(failureJSON: FailureJSON){
    
}

function getErrorJSONMeta(errorsJson: ErrorJSON): JSONMeta{

    // process the errorsJSON and get below values
    let meta: JSONMeta = {
        keys: ['e','rt','rt'],
        count: 5,
        range: { min: 1, max: 3 },
        total: 4,
        average: 5
    }
    return meta
}

function getFailureJSONMeta(failureJson: FailureJSON): JSONMeta{
    let meta: JSONMeta = {
        keys: ['e','rt','rt'],
        count: 5,
        range: { min: 1, max: 3 },
        total: 4,
        average: 5
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

isErrorsJSON(rawErrorsJson);


/** 
 * 
 * if true typecast to ErrorJson
 * let errorJson:  = isErrorJson ? rawErrorsJsonds as ErrorJson : return
 * })
 * 
 * 
 * */ 

let failureJson: FailureJSON = {
    'Overheated': ['FLP']
}

let d: DummyDataPoint = {
    value: 2,
    range: new Date(),
    json: {
        error: {
            data: errorsJson,
            meta: this.getErrorJSONMeta(errorsJson)
        },
        failure: {
            data: failureJson,
            meta: this.getFailureJSONMeta(failureJson)
        }
    }
}





