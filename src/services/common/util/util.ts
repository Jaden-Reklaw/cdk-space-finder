import { APIGatewayProxyEvent } from "aws-lambda";
import { JsonError } from "../error/error"; 
import { randomUUID } from "crypto";

export function createRandomId(){
    return randomUUID().toUpperCase();
}

export function parseJSON<T>(arg: string): T{
    try {
        return JSON.parse(arg) as T;
    } catch (error) {
        throw new JsonError(error.message)
    }
}
