import {type GraphQLFieldConfigMap } from "graphql"
import { objectTestFieldConfig, testFieldConfig } from "./FieldConfigs/TestFields.ts"

export const queryFields: GraphQLFieldConfigMap<any, any> = {
    test: testFieldConfig,
    testObject: objectTestFieldConfig
}