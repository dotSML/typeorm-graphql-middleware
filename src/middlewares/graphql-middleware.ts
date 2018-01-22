import * as express from 'express';
import * as bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { ValidationContext, GraphQLFieldResolver } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import getTypeDefs from '../services/get-type-definitions';
import getResolvers from '../services/get-resolvers';
import createTypeormLoader, { TypeormLoader } from '../services/typeorm-loader';

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
	// resolversGlobPattern: string[];
	// typeDefsGlobPattern: string[];
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

export type GraphqlServerContext<P = {}> = {
	loader: TypeormLoader;
} & P;

export default function graphqlServerMiddleware(
	options: GraphqlServerOptions & {
		resolversGlobPattern: string[];
		typeDefsGlobPattern: string[];
	},
): express.Router {
	const router = express.Router();

	const {
		simulatedLatency,
		resolversGlobPattern,
		typeDefsGlobPattern,
		endpointUrl,
		graphiqlUrl,
		enableGraphiql,
		...rest
	} = options;

	const schema = makeExecutableSchema({
		resolvers: getResolvers(resolversGlobPattern),
		typeDefs: getTypeDefs(typeDefsGlobPattern),
	});

	const context = () => ({
		loader: createTypeormLoader(),
		...context,
	});

	const formatResponseFn = (response: object) => {
		return rest.formatResponse ? rest.formatResponse(response) : response;
	};

	router.use(
		endpointUrl || '/graphql',
		bodyParser.json(),
		graphqlExpress({
			...rest,
			schema,
			context,
			formatResponse: (response: object) => {
				return simulatedLatency === undefined || simulatedLatency === 0
					? formatResponseFn(response)
					: new Promise(resolve => setTimeout(() => resolve(formatResponseFn(response)), simulatedLatency));
			},
		}),
	);

	if (enableGraphiql) {
		router.use(
			graphiqlUrl || '/graphiql',
			bodyParser.json(),
			graphiqlExpress({
				endpointURL: endpointUrl || '/graphql',
			}),
		);
	}

	return router;
}