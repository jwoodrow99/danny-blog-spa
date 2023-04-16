import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { A as RouteLink } from '@solidjs/router';

import styles from './BlogPostListItemComponent.module.css';

const BlogPostListItemComponent: Component<any> = (props) => {
	createEffect(() => {
		console.log('Render: BlogPostListItemComponent');
	});
	return (
		<>
			<div id={props.key} class="flex flex-col bg-zinc-800 px-8 py-5 rounded">
				<div class="text-3xl font-medium">{props.blog.title}</div>
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
