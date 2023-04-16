import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { useParams, A as RouteLink } from '@solidjs/router';

import http from '../http';

import styles from './BlogPage.module.css';

const BlogPage: Component<any> = (props) => {
	const params = useParams();
	const [blog, setBlog]: any = createSignal({});

	createEffect(() => {
		console.log('Render: BlogPage');

		http
			.get(`/blog/${params.id}`)
			.then((response) => {
				setBlog(response.data.blog);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	});

	return (
		<>
			<div class="flex flex-col bg-zinc-800 p-10 rounded">
				<div class="text-3xl font-medium">{blog().title}</div>
				<div class="flex flex-row space-x-5 mt-3">
					<div class="text-xs">
						<RouteLink href={`/user/${blog().user?.id}`}>
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
