import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const theaterListType = new GraphQLObjectType({
    name: "TheaterList",
    fields: () => ({
        theater_id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        cinema_chain_id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        theater_location: {
            type: new GraphQLNonNull(GraphQLString)
        },
        theater_city: {
            type: new GraphQLNonNull(GraphQLString)
        },
    })
})