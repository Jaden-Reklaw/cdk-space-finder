import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./data/postSpaces";
import { getSpaces } from "./data/getSpaces";
import { updateSpaces } from "./data/updateSpaces";
import { deleteSpaces } from "./data/deleteSpaces";
import { errorCheck } from "../error/error";

const ddbClient = new DynamoDBClient({})

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    
    let response: APIGatewayProxyResult;

    try {
        switch (event.httpMethod) {
            case 'GET':
                response = await getSpaces(event, ddbClient);
                break;
            case 'POST':
                response = await postSpaces(event, ddbClient);
                break
            case 'PUT':
                response = await updateSpaces(event, ddbClient);
                break;
            case 'DELETE':
                response = await deleteSpaces(event, ddbClient);
                break;
            default:
                break;
        }
        console.log(response)
        return response;
    } catch (error) {
        
        console.log("An error occurred ---", error);
        return errorCheck(error);
    }
}
