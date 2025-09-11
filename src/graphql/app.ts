import { GraphQLObjectType, GraphQLSchema} from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express, { type Request, type Response } from 'express';
import { ruruHTML } from 'ruru/server';
import { queryFields } from './QueryFields.ts';

const app = express(); 

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: queryFields
    })
})

app.get('/', (req: Request, res: Response) => {
    res.type('html');
    res.end(ruruHTML({endpoint: '/graphql'}))
})

app.all('/graphql', createHandler({
    schema: schema
}))

export default app