import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';

import http from '../http';

import styles from './LoginPage.module.css';

const LoginPage: Component = () => {
	const [email, setEmail] = createSignal('');
	const [password, setPassword] = createSignal('');

	createEffect(() => {
		console.log('Render: LoginPage');
	});

	const login = () => {
		http
			.post('/auth/login/', {
				email: email(),
				password: password(),
			})
			.then((response) => {
				localStorage.setItem('access_token', response.data.access_token);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
				console.log(error.response.data);
			});

		setEmail('');
		setPassword('');
	};

	return (
		<>
			<div class="flex flex-col space-y-5 p-10">
				<div>
					<input
						class="text-black"
						type="text"
						id="email"
						value={email()}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
				</div>
				<div>
					<input
						class="text-black"
						type="text"
						id="password"
						value={password()}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
				</div>
				<div>
					<button
						type="button"
						onclick={() => {
							login();
						}}
					>
						Login
					</button>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
