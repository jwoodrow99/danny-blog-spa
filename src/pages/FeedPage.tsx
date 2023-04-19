import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import http from '../http';

import styles from './FeedPage.module.css';

import BlogPostListItemComponent from '../components/BlogPostListItemComponent';

const FeedPage: Component = () => {
	const [blogs, setBlogs] = createSignal([]);

	createEffect(() => {
		console.log('Render: HomePage');

		http
			.get('/user/feed')
			.then((response) => {
				setBlogs(response.data.blogs);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	});

	return (
		<>
			<div class="flex flex-col space-y-5">
				{blogs().map((blog: any) => {
					return (
						<BlogPostListItemComponent
							key={`blog-${blog.id}`}
							blog={blog}
						></BlogPostListItemComponent>
					);
				})}
			</div>
		</>
	);
};

export default FeedPage;
