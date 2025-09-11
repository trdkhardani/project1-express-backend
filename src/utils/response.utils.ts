import { Status, type ResponseInterface } from '../models/response.ts';

export const successResponse = async (data: any, message?: string) => {
    return {
        status: Status.true,
        statusCode: 200,
        data: data,
        message: message || "Success"
    }
}

export const acceptedResponse = async (message?: string) => {
    return {
        status: Status.true,
        statusCode: 202,
        data: null,
        message: message || "The resource is still being processed"
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

export const unauthorizedResponse = async (message?: string) => {
    return {
        status: Status.false,
        statusCode: 401,
        data: null,
        message: message || "Unauthorized"
    }
}

export const forbiddenResponse = async (message?: string) => {
    return {
        status: Status.false,
        statusCode: 403,
        data: null,
        message: message || "Forbidden"
    }
}

export const internalServerErrorResponse = (message?: string) => {
    return {
        status: Status.false,
        statusCode: 500,
        data: null,
        message: message || "Internal Server Error"
    }
}

export const anyErrorResponse = (statusCode: number, message?: string) => {
    return {
        status: Status.false,
        statusCode: statusCode,
        data: null,
        message: message || "Error"
    }
}