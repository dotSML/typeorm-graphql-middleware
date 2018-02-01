import graphqlMiddleware, { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
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

const typeormGraphqlMiddleware = async ({
	debug = {},
	paths,
	applyMiddleware = [],
	graphql,
}: TypeormGraphqlMiddlewareConfig) => {
	return graphqlMiddleware({
		simulatedLatency: debug.simulatedLatency || 0,
		resolversGlobPattern: paths.resolvers,
		typeDefsGlobPattern: paths.typeDefs,
		debug: debug.logging,
		applyMiddleware,
		...graphql,
	}) as express.Router;
};

export default typeormGraphqlMiddleware;

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
