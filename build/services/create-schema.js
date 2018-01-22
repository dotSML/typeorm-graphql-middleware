"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const get_type_definitions_1 = require("./get-type-definitions");
let cachedContent = '';
exports.default = (typeDefsPath, outputPath) => {
    let typeDefs = get_type_definitions_1.default(typeDefsPath);
    typeDefs = typeDefs.map(def => def.replace(/\s*extend\s*/g, ''));
    console.log(typeDefs);
    const schema = merge_graphql_schemas_1.mergeTypes(typeDefs);
    if (cachedContent !== schema) {
        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, schema);
        cachedContent = schema;
    }
    return cachedContent;
};
//# sourceMappingURL=create-schema.js.map