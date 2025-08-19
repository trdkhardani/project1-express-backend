export enum Status {
    true = "success",
    false = "error"
}

export interface ResponseInterface {
    status: Status,
    statusCode?: number,
    data: any,
    message: string
}