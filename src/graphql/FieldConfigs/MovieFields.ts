import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString, type GraphQLFieldConfig } from "graphql";
import { movieListType } from "../ObjectTypes/MovieType.ts";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const movies = await prisma.movie.findMany()

export const movieListFieldConfig: GraphQLFieldConfig<any, any> = {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(movieListType))),
    resolve: (_) => {
        return movies;
    }
}

export const movieByIdFieldConfig: GraphQLFieldConfig<any, any> = {
    type: new GraphQLNonNull(movieListType),
    args: {
        movie_id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: (_, {movie_id}) => {
        return movies.find((movie) => movie.movie_id === movie_id)
    }
}