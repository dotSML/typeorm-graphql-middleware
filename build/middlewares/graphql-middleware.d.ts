/// <reference types="express" />
import * as express from 'express';
import { ValidationContext, GraphQLFieldResolver } from 'graphql';
import { TypeormLoader } from '../services/typeorm-loader';
export declare enum LogAction {
    request = 0,
    parse = 1,
    validation = 2,
    execute = 3,
}
export declare enum LogStep {
    start = 0,
    end = 1,
    status = 2,
}
export interface LogMessage {
    action: LogAction;
    step: LogStep;
    key?: string;
    data?: object;
}
export interface GraphqlServerOptions {
    resolversGlobPattern: string[];
    typeDefsGlobPattern: string[];
    simulatedLatency?: number;
    debug?: boolean;
    endpointUrl?: string;
    graphiqlUrl?: string;
    enableGraphiql?: boolean;
    formatError?: () => void;
    context?: any;
    logFunction?: (message: LogMessage) => any;
    formatParams?: (params: object) => any;
    validationRules?: Array<(context: ValidationContext) => any>;
    formatResponse?: (response: object) => any;
    fieldResolver?: GraphQLFieldResolver<any, any>;
    tracing?: boolean;
    cacheControl?: boolean;
}
export declare type GraphqlServerContext<P> = {
    loader: TypeormLoader;
} & P;
export default function graphqlServerMiddleware(options: GraphqlServerOptions): express.Router;
