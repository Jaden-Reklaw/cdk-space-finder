import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    
    try {
        let message: string;

        switch (event.httpMethod) {
            case 'GET':
                message = "Hello from GET spaces!"
                break;
            case 'POST':
                message = "Hello from POST spaces!"
                break;
        
            default:
                message = "Hello from DEFAULT spaces!"
                break;
        }

        return {
            statusCode: 200,
            headers: {
                contentType: 'application/json'
            },
            body: JSON.stringify(message)
        }
    } catch (error) {
        console.log("Error on invoking lambda:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Something went wrong!"})
        }
    }
}
