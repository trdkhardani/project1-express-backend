import { Status, type ResponseInterface } from '../models/response';

export const successResponse = async (data: any, message?: string) => {
    return {
        status: Status.true,
        statusCode: 200,
        data: data,
        message: message || "Success"
    }
}

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

export const unauthorizedResponse = async (message: string) => {
    return {
        status: Status.false,
        statusCode: 401,
        data: null,
        message: message || "Unauthorized"
    }
}

export const internalServerErrorResponse = () => {
    return {
        status: Status.false,
        statusCode: 500,
        data: null,
        message: "Internal Server Error"
    }
}