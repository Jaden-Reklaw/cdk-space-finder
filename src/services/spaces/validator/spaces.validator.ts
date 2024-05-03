import { MissingFieldError } from "../../error/error";

export function validateAsSpaceRequest(arg: any, requiredFields: string[]) {

    for (const field of requiredFields) {
        if (arg[field] === undefined) {
            throw new MissingFieldError(field);
        }
    }
}