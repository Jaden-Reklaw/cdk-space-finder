import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SpacesRequest } from "../../common/model/request";
import { deleteByValue, editById, findAll, findByValue, save } from "../../common/data/crud";
import { validate as validate } from "../../common/validator/validator";
import { resposeEntity } from "../../common/model/response";
import { deleteHeaders, getHeaders, postHeaders, putHeaders } from "../../common/util/header";
import { createRandomId, parseJSON } from "../../common/util/util";
import { IdMismatchError, MissingBodyError, MissingFieldError, MissingQueryParamError } from "../../common/error/error";


const spacesTable = process.env.SPACES_TABLE_NAME || "";

//todo: Need to add spaceRequest mapped to DAO
export async function createSpaces(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    console.log("event", event);
    if(event.body === null) {
        throw new MissingBodyError();
    }

    const spacesRequest = parseJSON<SpacesRequest>(event.body);
    spacesRequest.id = createRandomId();

    validate(spacesRequest, ['location', 'name'], MissingFieldError);

    const response: SpacesRequest = await save(spacesRequest, spacesTable);

    return resposeEntity(201, postHeaders(`/spaces/${response?.id}`), response);
}

//todo: Need to add DAO mapped to a DTO Response
export async function readSpaces(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

        const spaces = await findAll<SpacesRequest>(spacesTable);
        
        return resposeEntity(200, getHeaders(), spaces);
}

//todo: Need to add DAO mapped to a DTO Response
export async function readSpace(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    validate(event.queryStringParameters, ['id'], MissingQueryParamError);

    const space: SpacesRequest = await findByValue<SpacesRequest>({id: event.queryStringParameters['id']}, spacesTable);
    
    return resposeEntity(200, getHeaders(), space);
}

//todo: Need to add spaceRequest mapped to DAO
export async function updateSpace(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    validate(event.queryStringParameters, ['id'], MissingQueryParamError);
        
    if(event.body === null) throw new MissingBodyError();
    
    const spacesRequest = parseJSON<SpacesRequest>(event.body);

    if(spacesRequest.id != event.queryStringParameters['id']) 
        throw new IdMismatchError("Ids for updates do not match!")  
    
    await editById<SpacesRequest>(spacesRequest, spacesTable, event.queryStringParameters['id']);
    
    return resposeEntity(204, putHeaders(`/spaces/${spacesRequest.id}`), {});
    
}

export async function deleteSpace(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        
    validate(event.queryStringParameters, ['id'], MissingQueryParamError);

    await deleteByValue({id: event.queryStringParameters.id}, spacesTable);

    return resposeEntity(204, deleteHeaders(), {});
}


