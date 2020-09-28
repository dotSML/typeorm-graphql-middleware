import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { mergeTypeDefs } from '@graphql-tools/merge';
import getTypeDefs from './get-type-definitions';

let cachedContent = '';

export default (typeDefsPath: string[], outputPath: string) => {
	let typeDefs = getTypeDefs(typeDefsPath);
	typeDefs = typeDefs.map(def => def.replace(/\s*extend\s*/g, ''));

	const schema = mergeTypeDefs(typeDefs).toString();

	if (cachedContent !== schema) {
		mkdirp.sync(path.dirname(outputPath));
		fs.writeFileSync(outputPath, schema);

		cachedContent = schema;
	}

	return cachedContent;
};
