import { GraphQLString, type GraphQLFieldConfig } from "graphql"
import { Status } from "../../models/response.ts"
import { testObjectType } from "../ObjectTypes/TestType.ts"

export const testFieldConfig: GraphQLFieldConfig<any, any> = {
    type: GraphQLString,
    resolve: (_) => {
        return "It works!"
    }
}

export const objectTestFieldConfig: GraphQLFieldConfig<any, any> = {
    type: testObjectType,
    resolve: (_) => {
        return {
            status: Status.true,
            message: "It works"
        }
    }
}