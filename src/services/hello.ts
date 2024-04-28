import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    
    const resposne: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
            contentType: 'application/json'
        },
        body: JSON.stringify({message: 'Hello from Lambda TypeScript, this is the id: ' + v4()})
    }
    console.log(event);
    
    return resposne;
}
