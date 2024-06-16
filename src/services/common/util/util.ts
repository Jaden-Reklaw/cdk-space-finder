import { APIGatewayProxyEvent } from "aws-lambda";
import { JsonError } from "../error/error"; 
import { randomUUID } from "crypto";
import { log } from "console";

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

export function hasAdminGroup(event: APIGatewayProxyEvent) {
    log("event.requestContext.authorizer?.claims", event.requestContext.authorizer?.claims);
    
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    }
    return false;
}
