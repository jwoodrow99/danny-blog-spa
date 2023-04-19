import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { A as RouteLink } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';

import { GlobalContext } from '../GlobalContext';

import http from '../http';

import styles from './BlogCommentListItemComponent.module.css';

const BlogCommentListItemComponent: Component<any> = (props) => {
	const navigate = useNavigate();

	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);

	createEffect(() => {
		console.log('Render: BlogCommentListItemComponent');
	});

	return (
		<>
			<div
				id={props.comment.id}
				class="flex flex-col bg-zinc-900 px-8 py-5 rounded"
			>
				<div class="flex flex-row space-x-5 mt-1">
					<div class="text-xs">
						<RouteLink
							class="hover:text-zinc-300"
							href={`/user/${props.comment.user.id}`}
						>
							{props.comment.user.email}
						</RouteLink>
					</div>
					<div class="text-xs text-zinc-300	">
						{new Date(props.comment.created_at).toDateString()}
					</div>
				</div>
				<div class="mt-2">{props.comment.text}</div>
			</div>
		</>
	);
};

export default BlogCommentListItemComponent;
