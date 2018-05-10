/* tslint:disable */
import { GraphqlServerContext } from 'typeorm-graphql-middleware';
import { GraphQLResolveInfo } from 'graphql';

export {};

declare global {
	namespace GQL {
		export type TypeResolverFn<TSource = any, TResult = any, TArgs = {}> = (
			source: TSource,
			args: TArgs,
			context: GraphqlServerContext,
			info: GraphQLResolveInfo,
		) => TypeResolveResult<TResult> | Promise<TypeResolveResult<TResult>>;

		export type TypeResolveResult<TResult> =
			| TResult
			| { [P in keyof TResult]: TypeResolveResult<TResult[P]> | Promise<TypeResolveResult<TResult[P]>> };

		export interface Resolver {
			Query?: {
				postList?: QueryPostListResolver;
				userList?: QueryUserListResolver;
			};
			Post?: {
				id?: PostIdResolver;
				name?: PostNameResolver;
				user?: PostUserResolver;
			};
			User?: {
				id?: UserIdResolver;
				name?: UserNameResolver;
				posts?: UserPostsResolver;
			};
			Mutation?: {
				addPost?: MutationAddPostResolver;
				addUser?: MutationAddUserResolver;
			};
		}

		export type QueryPostListResolver = TypeResolverFn<Query, Post[] | undefined>;

		export type QueryUserListResolver = TypeResolverFn<Query, User[] | undefined>;

		export type PostIdResolver = TypeResolverFn<Post, string>;

		export type PostNameResolver = TypeResolverFn<Post, string>;

		export type PostUserResolver = TypeResolverFn<Post, User>;

		export type UserIdResolver = TypeResolverFn<User, string>;

		export type UserNameResolver = TypeResolverFn<User, string>;

		export type UserPostsResolver = TypeResolverFn<User, Post[]>;

		export type MutationAddPostResolver = TypeResolverFn<Mutation, Post, AddPostMutationArgs>;

		export type MutationAddUserResolver = TypeResolverFn<Mutation, User, AddUserMutationArgs>;

		export interface Query {
			postList?: Post[] | null;
			userList?: User[] | null;
		}
		export interface Post {
			id: string;
			name: string;
			user: User;
		}
		export interface User {
			id: string;
			name: string;
			posts: Post[];
		}
		export interface Mutation {
			addPost: Post;
			addUser: User;
		}

		export interface AddPostInput {
			name: string;
			userId: string;
		}
		export interface AddUserInput {
			name: string;
			posts?: string[] | null;
		}
		export interface AddPostMutationArgs {
			input: AddPostInput;
		}
		export interface AddUserMutationArgs {
			input?: AddUserInput;
		}
	}
}
