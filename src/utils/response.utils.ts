import { Status, type ResponseInterface } from '../models/response';

export const badRequestResponse = async (message: string) => {
    return {
        status: Status.false,
        statusCode: 400,
        data: null,
        message: message || "Bad Request"
    }
}

export const conflictResponse = async (message: string) => {
    return {
        status: Status.false,
        statusCode: 409,
        data: null,
        message: message || "Conflict"
    }
}