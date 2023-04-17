import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { GlobalContext } from '../GlobalContext';

import http from '../http';

const HomePage: Component = () => {
	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);

	const [blogs, setBlogs] = createSignal([]);

	createEffect(() => {
		http
			.get('/blog', { params: { order_by: 'created_at:desc' } })
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
			<ul>
				{blogs().map((blog: any) => {
					return <li>{blog.title}</li>;
				})}
			</ul>
		</>
	);
};

export default HomePage;
