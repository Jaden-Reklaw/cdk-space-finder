import { APIGatewayProxyResult } from "aws-lambda";

export const resposeEntity = <T>(statusCode: number, headers: { [header: string]: string | number | boolean }, item: T): APIGatewayProxyResult => ({
    statusCode, headers, body: JSON.stringify(item)
});

export const errorResposeEntity = (statusCode: number, headers: { [header: string]: string | number | boolean }, message: string): APIGatewayProxyResult => ({
    statusCode, headers, body: JSON.stringify({error: message})
});

export interface SpacesResponse {
    id: string,
    location: string,
    name: string,
    photoUrl?: string
}

