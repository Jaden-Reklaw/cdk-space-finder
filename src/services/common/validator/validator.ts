export function validate(arg: any, requiredParams: string[], ErrorType: new (param: string) => Error) {
    for (const param of requiredParams) {
        if (arg[param] === undefined) {
            throw new ErrorType(param);
        }
    }
}