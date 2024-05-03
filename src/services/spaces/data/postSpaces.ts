import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateAsSpaceRequest } from "../validator/spaces.validator";
import { spacesRequest } from "../model/spaces";
import { createRandomId, parseJSON } from "../../common/util";

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const item: spacesRequest = parseJSON(event.body);
    item.id = createRandomId();
    validateAsSpaceRequest(item, ['id', 'location', 'name'])

    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        // Item: {
        //     id: {
        //         S: randomId
        //     },
        //     location: {
        //         S: item.location
        //     }
        // }
        Item: marshall(item)
    }));
    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: item.id})
    }
}