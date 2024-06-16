import { APIGatewayProxyResult } from "aws-lambda";
import { errorResposeEntity } from "../model/response";
import { errorHeaders } from "../util/header";

export class MissingFieldError extends Error {
    constructor(missingField: string) {
        super(`Field ${missingField} required!`);
    }
}

export class DataError extends Error {
    constructor(action: string) {
        super(`Failed ${action}!`);
    }
}

export class JsonError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class IdMismatchError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class MissingQueryParamError extends Error {
    constructor(param: string) {
        super(`Query parammeter ${param} required!`);
    }
}

export class MissingPathParamError extends Error {
    constructor(param: string) {
        super(`Path parammeter ${param} required!`);
    }
}

export class MissingBodyError extends Error {
    constructor() {
        super(`Event body required!`);
    }
}

export const errorCheck = (error: { message: any; }): APIGatewayProxyResult => {

    let statusCode: number;

    switch (error.constructor) {
        case IdMismatchError:
            statusCode = 409
            break;
        case MissingQueryParamError:
        case MissingPathParamError:
        case MissingBodyError:
            statusCode = 400;
            break;
        case MissingFieldError:
        case JsonError:
            statusCode = 422;
            break;
        case DataError:
        default:
            statusCode  = 500;
            break;
    }
    
    return errorResposeEntity(statusCode, errorHeaders(), error.message);
}