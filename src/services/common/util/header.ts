export const getHeaders = () => ({
    "Content-Type": "application/json"
});

export const postHeaders = (path: string) => ({
    "Content-Type": "application/json",
    "Location": path
});

export const putHeaders = (path: string) => ({
    "Content-Type": "application/json",
    "Location": path
});

export const deleteHeaders = () => ({
    "Content-Type": "application/json"
});

export const errorHeaders = () => ({
    "Content-Type": "application/json"
});
