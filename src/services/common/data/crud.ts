import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DataError } from "../error/error";
import { log } from "console";

const dDBClient = new DynamoDBClient({})
const dDBDocClient = DynamoDBDocumentClient.from(dDBClient);

export async function save<T extends Record<string, any>>(item: T, tableName: string): Promise<T> {

    const command = new PutCommand({
        TableName: tableName,
        Item: item
    });

    const response = await dDBDocClient.send(command);

    if (response.$metadata.httpStatusCode === 200) {
        log(`Saved: ${JSON.stringify(item)}`);
        return item;
    } else {
        throw new DataError("save");
    }
}

export async function findAll<T extends Record<string, any>>(tableName: string): Promise<T[]> {

    const command = new ScanCommand({
        TableName: tableName
    });

    const response = await dDBDocClient.send(command);

    if (response.$metadata.httpStatusCode === 200) {
        log(`Read All: ${JSON.stringify(response.Items as T[])}`);
        return response.Items as T[];
    } else {
        throw new DataError("findAll");
    }
}

export async function findByValue<T extends Record<string, any>>(item: any, tableName: string): Promise<T> {

    const command = new GetCommand({
        TableName: tableName,
        Key: item
    });

    const response = await dDBDocClient.send(command);

    if (response.$metadata.httpStatusCode === 200) {
        log(`Read: ${JSON.stringify(response.Item as T)}`);
        return response.Item as T;
    } else {
        throw new DataError("findByValue");
    }
}

export async function editById<T extends Record<string, any>>(item: T, id: string, tableName: string): Promise<void> {

    const itemKeys: string[] = Object.keys(item).filter((k: string) => k !== id);
    const params = {
        TableName: tableName,
        UpdateExpression: `SET ${itemKeys.map((k: string, index: number) => `#field${index} = :value${index}`).join(', ')}`,
        ExpressionAttributeNames: itemKeys.reduce((accumulator: any, k: string, index: number) => ({
            ...accumulator,
            [`#field${index}`]: k
        }), {}),
        ExpressionAttributeValues: itemKeys.reduce((accumulator: any, k: string, index: number) => ({
            ...accumulator,
            [`:value${index}`]: item[k]
        }), {}),
        Key: {
            [id]: item[id]
        },
        ReturnValues: 'ALL_NEW' as const
    };

    const command = new UpdateCommand(params);

    const response = await dDBDocClient.send(command);

    if (response.$metadata.httpStatusCode === 200) {
        log(`Edited: ${JSON.stringify(item)}`);
    } else {
        throw new DataError("edit");
    }
}

export async function deleteByValue(item: any, tableName: string): Promise<void> {

    const command = new DeleteCommand({
        TableName: tableName,
        Key: item
    });

    const response = await dDBDocClient.send(command);

    if (response.$metadata.httpStatusCode === 200) {
        log(`Deleted: ${JSON.stringify(item)}`);
    } else {
        throw new DataError("delete");
    }
}

