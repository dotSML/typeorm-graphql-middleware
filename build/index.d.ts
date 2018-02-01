/// <reference types="express" />
import { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
import { FieldResolver, SubscriptionResolver, RootResolver } from './typings';
import resolve from './services/resolve-helper';
import createTypings from './services/create-typings';
import createSchema from './services/create-schema';
import * as express from 'express';
import createTypeormLoader, { TypeormLoader } from './services/typeorm-loader';
export interface TypeormGraphqlMiddlewareConfig {
    graphql: GraphqlServerOptions;
    paths: {
        resolvers: string[];
        typeDefs: string[];
    };
    debug?: {
        simulatedLatency?: number;
        logging?: boolean;
    };
    applyMiddleware?: Array<(args?: any) => any>;
}
declare const typeormGraphqlMiddleware: ({debug, paths, applyMiddleware, graphql}: TypeormGraphqlMiddlewareConfig) => Promise<express.Router>;
export default typeormGraphqlMiddleware;
export { FieldResolver, SubscriptionResolver, RootResolver, resolve, GraphqlServerOptions, createTypings, createSchema, GraphqlServerContext, TypeormLoader, createTypeormLoader };
