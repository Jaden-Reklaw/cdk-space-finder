import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { errorCheck } from "../common/error/error";
import { createSpaces, readSpace, readSpaces, updateSpace, deleteSpace } from "./controller/spaces.controller";

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    
    let response: APIGatewayProxyResult;

    try {
        switch (event.httpMethod) {
            case 'POST':
                response = await createSpaces(event);
                break
            case 'GET':
                if(event.queryStringParameters != null) {
                    response = await readSpace(event);
                    break;
                } else {
                    response = await readSpaces(event);
                    break;
                }
            case 'PUT':
                response = await updateSpace(event);
                break;
            case 'DELETE':
                response = await deleteSpace(event);
                break;
            default:
                break;
        }

        console.log(response)
        return response;
    } catch (error) {
        
        console.error("An error occurred ---", error);
        return errorCheck(error);
    }
}
