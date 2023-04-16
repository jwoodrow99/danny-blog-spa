import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { useParams, A as RouteLink } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';

import http from '../http';

import styles from './NewBlogPage.module.css';

const NewBlogPage: Component<any> = (props) => {
	const [title, setTitle]: any = createSignal('');
	const [article, setArticle]: any = createSignal('');

	const navigate = useNavigate();

	createEffect(() => {
		console.log('Render: NewBlogPage');
	});

	const save = () => {
		http
			.post('/blog', {
				title: title(),
				article: article(),
			})
			.then((response: any) => {
				navigate(`/blog/${response.data.blog.id}`);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	return (
		<>
			<div class="flex flex-col bg-zinc-800 p-10 rounded">
				<div>
					<input
						class="text-black px-5 py-2 rounded w-full"
						placeholder="Title"
						type="text"
						value={title()}
						onChange={(e) => setTitle(e.currentTarget.value)}
					/>
				</div>
				<div class="mt-5">
					<textarea
						class="text-black p-2 rounded w-full h-[30vh]"
						placeholder="Article"
						value={article()}
						onChange={(e) => setArticle(e.currentTarget.value)}
					></textarea>
				</div>
				<div class="mt-5">
					<button
						class="btn-primary px-5 py-2 w-full"
						type="button"
						onclick={() => {
							save();
						}}
					>
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export default NewBlogPage;
