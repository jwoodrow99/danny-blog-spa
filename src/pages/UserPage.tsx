import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { useParams } from '@solidjs/router';
import http from '../http';

import styles from './UserPage.module.css';

import BlogPostListItemComponent from '../components/BlogPostListItemComponent';

const UserPage: Component<any> = (props) => {
	const params = useParams();
	const [user, setUser]: any = createSignal({});
	const [followed, setFollowed] = createSignal(0);
	const [followCount, setFollowCount] = createSignal(0);
	const [blogs, setBlogs]: any = createSignal([]);

	createEffect(() => {
		console.log('Render: UserPage');
		http
			.get(`/user/${params.id}`)
			.then((response) => {
				setUser(response.data.user);
				setFollowed(response.data.user.followed_by_me);
				setFollowCount(response.data.user.followed_by_count);
			})
			.catch((error) => {
				console.log(error.response);
			});
	});

	createEffect(() => {
		http
			.get(`/blog`, {
				params: { search: `user_id:${user().id}`, order_by: 'created_at:desc' },
			})
			.then((response) => {
				setBlogs(response.data.blogs);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	});

	const follow = () => {
		http
			.post(`/user/${user().id}/follow`)
			.then((response) => {
				setFollowed(1);
				setFollowCount(followCount() + 1);

				let updatedUser = user();
				updatedUser.followed_by_me = 1;
				updatedUser.followed_by_count = followCount() + 1;
				setUser(updatedUser);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	const unfollow = () => {
		http
			.delete(`/user/${user().id}/follow`)
			.then((response) => {
				setFollowed(0);
				setFollowCount(followCount() - 1);

				let updatedUser = user();
				updatedUser.followed_by_me = 0;
				updatedUser.followed_by_count = followCount() - 1;
				setUser(updatedUser);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});
	};

	return (
		<>
			<div class="flex flex-col bg-zinc-900 p-10 rounded">
				<div class="text-3xl font-medium">{user().email}</div>
				<div class="flex flex-row justify-between">
					{followed() ? (
						<button
							class="border bg-white text-black px-2 rounded"
							onClick={() => {
								unfollow();
							}}
						>
							🤝 {followCount()}
						</button>
					) : (
						<button
							class="border px-2 rounded"
							onClick={() => {
								follow();
							}}
						>
							🤝 {followCount()}
						</button>
					)}
				</div>

				<div class="text-xs text-zinc-300	mt-3">
					{new Date(user().created_at).toDateString()}
				</div>

				<div class="mt-16">
					<h2 class="text-center text-3xl font-bold">Blog Posts</h2>
				</div>
				<div class="mt-6 flex flex-col space-y-5">
					{blogs().map((blog: any) => {
						return (
							<BlogPostListItemComponent
								key={`blog-${blog.id}`}
								blog={blog}
							></BlogPostListItemComponent>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default UserPage;
