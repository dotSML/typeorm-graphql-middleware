"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const graphql_tools_1 = require("graphql-tools");
const apollo_server_express_1 = require("apollo-server-express");
const get_type_definitions_1 = require("../services/get-type-definitions");
const get_resolvers_1 = require("../services/get-resolvers");
const typeorm_loader_1 = require("../services/typeorm-loader");
function graphqlServerMiddleware(options) {
    const router = express.Router();
    const { simulatedLatency, resolversGlobPattern, typeDefsGlobPattern, endpointUrl, graphiqlUrl, enableGraphiql, whitelist, applyMiddleware } = options, rest = __rest(options, ["simulatedLatency", "resolversGlobPattern", "typeDefsGlobPattern", "endpointUrl", "graphiqlUrl", "enableGraphiql", "whitelist", "applyMiddleware"]);
    const corsOptions = {
        origin: (origin, callback) => {
            if (origin === undefined || (whitelist && whitelist.indexOf(origin) !== -1)) {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        },
    };
    const schema = graphql_tools_1.makeExecutableSchema({
        resolvers: get_resolvers_1.default(resolversGlobPattern),
        typeDefs: get_type_definitions_1.default(typeDefsGlobPattern),
    });
    const context = () => (Object.assign({ loader: typeorm_loader_1.default() }, context));
    const formatResponseFn = (response) => {
        return rest.formatResponse ? rest.formatResponse(response) : response;
    };
    router.use(endpointUrl || '/graphql', whitelist ? cors(corsOptions) : (_, __, next) => next(), bodyParser.json(), ...applyMiddleware, apollo_server_express_1.graphqlExpress(Object.assign({}, rest, { schema,
        context, formatResponse: (response) => {
            return simulatedLatency === undefined || simulatedLatency === 0
                ? formatResponseFn(response)
                : new Promise(resolve => setTimeout(() => resolve(formatResponseFn(response)), simulatedLatency));
        } })));
    if (enableGraphiql) {
        router.use(graphiqlUrl || '/graphiql', whitelist ? cors(corsOptions) : (_, __, next) => next(), bodyParser.json(), apollo_server_express_1.graphiqlExpress({
            endpointURL: endpointUrl || '/graphql',
        }));
    }
    return router;
}
exports.default = graphqlServerMiddleware;
//# sourceMappingURL=graphql-middleware.js.map