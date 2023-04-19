import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { A as RouteLink } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';

import { GlobalContext } from '../GlobalContext';

import http from '../http';

import styles from './BlogPostListItemComponent.module.css';

const BlogPostListItemComponent: Component<any> = (props) => {
	const navigate = useNavigate();
	const [liked, setLiked] = createSignal(props.blog.liked_by_me);
	const [likesCount, setLikesCount] = createSignal(props.blog.likes_count);

	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);

	createEffect(() => {
		console.log('Render: BlogPostListItemComponent');
	});

	const likeBlog = () => {
		http
			.post(`/blog/${props.blog.id}/like`)
			.then((response) => {
				setLiked(1);
				setLikesCount(likesCount() + 1);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	const unlikeBlog = () => {
		http
			.delete(`/blog/${props.blog.id}/like`)
			.then((response) => {
				setLiked(0);
				setLikesCount(likesCount() - 1);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	return (
		<>
			<div id={props.key} class="flex flex-col bg-zinc-800 px-8 py-5 rounded">
				<div class="flex flex-row justify-between	">
					<div class="text-3xl font-medium">{props.blog.title}</div>
					{liked() ? (
						<button
							class="border bg-white text-black px-2 rounded"
							onClick={() => {
								unlikeBlog();
							}}
						>
							🔥 {likesCount()}
						</button>
					) : (
						<button
							class="border px-2 rounded"
							onClick={() => {
								likeBlog();
							}}
						>
							🔥 {likesCount()}
						</button>
					)}
				</div>
				<div class="flex flex-row space-x-5 mt-1">
					<div class="text-xs">
						<RouteLink
							class="hover:text-zinc-300"
							href={`/user/${props.blog.user.id}`}
						>
							{props.blog.user.email}
						</RouteLink>
					</div>
					<div class="text-xs text-zinc-300	">
						{new Date(props.blog.created_at).toDateString()}
					</div>
				</div>
				<div class="mt-2">{props.blog.article.substr(0, 90)} ...</div>
				<div class="mt-2">
					<RouteLink
						href={`/blog/show/${props.blog.id}`}
						class="hover:text-zinc-300"
					>
						Read more...
					</RouteLink>
				</div>
			</div>
		</>
	);
};

export default BlogPostListItemComponent;
