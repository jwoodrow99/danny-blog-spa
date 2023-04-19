import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { useParams, A as RouteLink } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';

import { GlobalContext } from '../GlobalContext';

import http from '../http';

import styles from './BlogPage.module.css';

const BlogPage: Component<any> = (props) => {
	const params = useParams();
	const navigate = useNavigate();
	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);
	const [blog, setBlog]: any = createSignal({});
	const [liked, setLiked] = createSignal(0);
	const [likesCount, setLikesCount] = createSignal(0);

	createEffect(() => {
		console.log('Render: BlogPage');

		http
			.get(`/blog/${params.id}`)
			.then((response) => {
				console.log(response);
				setBlog(response.data.blog);
				setLiked(response.data.blog.liked_by_me);
				setLikesCount(response.data.blog.likes_count);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	});

	const destroy = () => {
		http
			.delete(`/blog/${blog().id}`)
			.then((response) => {
				navigate(`/user/${user()?.id}`);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	const likeBlog = () => {
		http
			.post(`/blog/${blog().id}/like`)
			.then((response) => {
				setLiked(1);
				setLikesCount(likesCount() + 1);

				let updatedBlog = blog();
				updatedBlog.liked_by_me = 1;
				updatedBlog.likes_count = likesCount() + 1;
				setBlog(updatedBlog);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	const unlikeBlog = () => {
		http
			.delete(`/blog/${blog().id}/like`)
			.then((response) => {
				setLiked(0);
				setLikesCount(likesCount() - 1);

				let updatedBlog = blog();
				updatedBlog.liked_by_me = 0;
				updatedBlog.likes_count = likesCount() - 1;
				setBlog(updatedBlog);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	return (
		<>
			<div class="flex flex-col bg-zinc-800 p-10 rounded">
				<div class="flex flex-row justify-between">
					<div>
						<div class="text-3xl font-medium">{blog().title}</div>
						<button>🤝</button>
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
					<div class="flex flex-row space-x-5">
						{user()?.id == blog().user_id && (
							<>
								<div class="flex flex-col">
									<RouteLink
										class="hover:text-zinc-300 my-auto"
										href={`/blog/update/${blog().id}`}
									>
										edit
									</RouteLink>
								</div>

								<button
									class="hover:text-zinc-300"
									onclick={() => {
										destroy();
									}}
								>
									delete
								</button>
							</>
						)}
					</div>
				</div>
				<div class="flex flex-row space-x-5 mt-3">
					<div class="text-xs">
						<RouteLink
							class="hover:text-zinc-300"
							href={`/user/${blog().user?.id}`}
						>
							{blog().user?.email}
						</RouteLink>
					</div>
					<div class="text-xs text-zinc-300	">
						{new Date(blog().created_at).toDateString()}
					</div>
				</div>
				<div class="mt-10">{blog().article}</div>
			</div>
		</>
	);
};

export default BlogPage;
