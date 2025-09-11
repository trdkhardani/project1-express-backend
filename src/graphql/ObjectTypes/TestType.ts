import { GraphQLObjectType, GraphQLString } from "graphql";

export const testObjectType = new GraphQLObjectType({
    name: "TestObjectType",
    fields: () => ({
        status: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    })
})