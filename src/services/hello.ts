import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({});


export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const command = new ListBucketsCommand({});
    const listBucketResult = (await s3Client.send(command)).Buckets;
    
    const resposne: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
            contentType: 'application/json'
        },
        body: JSON.stringify({
            message: 'Hello from Lambda TypeScript, this is the id: ' + v4(),
            buckets: listBucketResult
        })
    }
    console.log(event);
    
    return resposne;
}
