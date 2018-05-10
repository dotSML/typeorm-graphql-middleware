import graphqlMiddleware, { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
import { FieldResolver, SubscriptionResolver, RootResolver } from './typings';
// import resolve from './services/resolve-helper';
import createTypings from './services/create-typings';
import createSchema from './services/create-schema';
import * as express from 'express';
import * as cors from 'cors';
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
	corsOptions?: cors.CorsOptions;
}

const typeormGraphqlMiddleware = async ({
	debug = {},
	paths,
	applyMiddleware = [],
	corsOptions,
	graphql,
}: TypeormGraphqlMiddlewareConfig) => {
	return graphqlMiddleware({
		simulatedLatency: debug.simulatedLatency || 0,
		resolversGlobPattern: paths.resolvers,
		typeDefsGlobPattern: paths.typeDefs,
		debug: debug.logging,
		applyMiddleware,
		corsOptions,
		...graphql,
	}) as express.Router;
};

export default typeormGraphqlMiddleware;

const resolve = <T extends (...args: any[]) => any>(fn: T) => (...args: any[]) => fn(...args);

export {
	FieldResolver,
	SubscriptionResolver,
	RootResolver,
	resolve,
	GraphqlServerOptions,
	createTypings,
	createSchema,
	GraphqlServerContext,
	TypeormLoader,
	createTypeormLoader,
};
