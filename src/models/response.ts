export enum Status {
    true = "success",
    false = "error"
}

export interface HttpStatusCode {
    statusCode?: number
}

export interface ResponseInterface<T> extends HttpStatusCode {
    status: Status,
    // statusCode?: number,
    data?: any,
    message: string
}

export interface ErrorResponse extends ResponseInterface<{}> {
    status: Status.false,
    // statusCode?: number,
    data: null,
    message: string | "Error"
}