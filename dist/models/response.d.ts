export declare enum Status {
    true = "success",
    false = "error"
}
export interface ResponseInterface {
    status: Status;
    statusCode?: number;
    data: any;
    message: string;
}
//# sourceMappingURL=response.d.ts.map