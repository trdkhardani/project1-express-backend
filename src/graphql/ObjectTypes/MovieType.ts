import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const movieListType = new GraphQLObjectType({
    name: "MovieList",
    fields: () => ({
        movie_id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        movie_title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        movie_synopsis: {
            type: new GraphQLNonNull(GraphQLString)
        },
        movie_duration: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        movie_poster: {
            type: new GraphQLNonNull(GraphQLString)
        },
    })
})