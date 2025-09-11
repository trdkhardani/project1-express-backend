import {type GraphQLFieldConfigMap } from "graphql"
import { objectTestFieldConfig, testFieldConfig } from "./FieldConfigs/TestFields.ts"
import { movieByIdFieldConfig, movieListFieldConfig } from "./FieldConfigs/MovieFields.ts"

export const queryFields: GraphQLFieldConfigMap<any, any> = {
    test: testFieldConfig,
    testObject: objectTestFieldConfig,
    movies: movieListFieldConfig,
    movieById: movieByIdFieldConfig
}