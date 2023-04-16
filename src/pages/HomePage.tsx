import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import http from '../http';

import styles from './HomePage.module.css';

import BlogPostListItemComponent from '../components/BlogPostListItemComponent';

const HomePage: Component = () => {
	const [blogs, setBlogs] = createSignal([]);
	const [search, setSearch] = createSignal('');

	createEffect(() => {
		console.log('Render: HomePage');

		http
			.get('/blog')
			.then((response) => {
				setBlogs(response.data.blogs);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	});

	const searchBlogs = () => {
		http
			.get('/blog', { params: { search: `title:${search()}` } })
			.then((response) => {
				setBlogs(response.data.blogs);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
		setSearch('');
	};

	return (
		<>
			<div class="flex flex-row space-x-5 my-10 px-5">
				<input
					class="text-black w-full rounded-full px-3 py-1"
					type="text"
					id="email"
					value={search()}
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<button
					class="btn-primary px-5"
					type="button"
					onclick={() => {
						searchBlogs();
					}}
				>
					search
				</button>
			</div>

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

export default HomePage;
