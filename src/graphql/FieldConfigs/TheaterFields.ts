import { GraphQLID, GraphQLList, GraphQLNonNull, type GraphQLFieldConfig } from "graphql";
import { theaterListType } from "../ObjectTypes/TheaterType.ts";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

export const theaterListFieldConfig: GraphQLFieldConfig<any, any> = {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(theaterListType))),
    resolve: (async (_) => {
        return await prisma.theater.findMany();
    })
}

export const theaterByIdFieldConfig: GraphQLFieldConfig<any, any> = {
    type: new GraphQLNonNull(theaterListType),
    args: {
        theater_id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: (async (_, {theater_id}) => {
        return await prisma.theater.findUnique({
            where: {
                theater_id: theater_id
            }
        })
    })
}