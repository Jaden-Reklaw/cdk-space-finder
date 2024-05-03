import { handler } from "../src/services/spaces/handler";

// If you don't use the debugger you can run ts-node test/spaces.test.ts 
process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "SpacesTable-029133f48be3";

// const spacesPostRequest = {
//     httpMethod: 'POST',
//     body: JSON.stringify({ location: 'HAWAII' })
// }

// handler(spacesPostRequest as any, {} as any);

//GET ALL Spaces Request
// const spacesGetRequest = { httpMethod: 'GET' }

// handler(spacesGetRequest as any, {} as any);

//GET Spaces by Id Request
// const spacesGetByIdRequest = { 
//     httpMethod: 'GET',
//     queryStringParameters: {
//         id: '78294228-bbf1-41c2-92ce-4c9217d4d1db'
//     }
// }

// handler(spacesGetByIdRequest as any, {} as any);

const spacesUpdateByIdRequest = { 
    httpMethod: 'PUT',
    queryStringParameters: {
        id: '78294228-bbf1-41c2-92ce-4c9217d4d1db'
    },
    body: JSON.stringify({ location: 'LONDON' })
}

handler(spacesUpdateByIdRequest as any, {} as any);

