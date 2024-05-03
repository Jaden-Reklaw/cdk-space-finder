export class MissingFieldError extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} expected!`)
    }
}

export class JsonError extends Error {}

export const errorCheck = (error) => {

    let statusCode = 500;
    if (error instanceof MissingFieldError || error instanceof JsonError) {
        statusCode = 400;
    }
    return {
        statusCode,
        body: JSON.stringify(error.message)
    };
}