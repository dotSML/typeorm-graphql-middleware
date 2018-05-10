import PostEntity from '../../entities/PostEntity';
import UserEntity from '../../entities/UserEntity';
import { resolve } from '../../../../../src'; // import { resolve } from 'typeorm-graphql-schema';

const resolver: GQL.Resolver = {
	Query: {
		postList: resolve<GQL.QueryPostListResolver>(async () => {
			const post = await PostEntity.find();

			return post;
		}),
	},

	Mutation: {
		addPost: async (_, { input }) => {
			const post = new PostEntity();
			Object.assign(post, { name: input.name });

			const user = await UserEntity.findOneById(input.userId);
			Object.assign(post, { user });

			await post.save();

			return post;
		},
	},
};

export default resolver;
