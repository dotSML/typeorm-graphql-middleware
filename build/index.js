"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_middleware_1 = require("./middlewares/graphql-middleware");
// import resolve from './services/resolve-helper';
const create_typings_1 = require("./services/create-typings");
exports.createTypings = create_typings_1.default;
const create_schema_1 = require("./services/create-schema");
exports.createSchema = create_schema_1.default;
const typeorm_loader_1 = require("./services/typeorm-loader");
exports.createTypeormLoader = typeorm_loader_1.default;
const typeormGraphqlMiddleware = ({ debug = {}, paths, applyMiddleware = [], corsOptions, graphql, }) => __awaiter(this, void 0, void 0, function* () {
    return graphql_middleware_1.default(Object.assign({ simulatedLatency: debug.simulatedLatency || 0, resolversGlobPattern: paths.resolvers, typeDefsGlobPattern: paths.typeDefs, debug: debug.logging, applyMiddleware,
        corsOptions }, graphql));
});
exports.default = typeormGraphqlMiddleware;
const resolve = (fn) => (...args) => fn(...args);
exports.resolve = resolve;
//# sourceMappingURL=index.js.map