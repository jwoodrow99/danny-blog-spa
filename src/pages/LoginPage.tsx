import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { GlobalContext } from '../GlobalContext';

import http from '../http';

import styles from './LoginPage.module.css';

const LoginPage: Component = () => {
	const { authenticated, setAuthenticated }: any = useContext(GlobalContext);
	const [email, setEmail] = createSignal('');
	const [password, setPassword] = createSignal('');

	const navigate = useNavigate();

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
				setAuthenticated(true);
				navigate('/');
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
				<div class="flex flex-row justify-center w-full">
					<input
						class="text-black px-5 py-2 rounded-full w-full"
						placeholder="email"
						type="text"
						id="email"
						value={email()}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
				</div>
				<div class="flex flex-row justify-center w-full">
					<input
						class="text-black px-5 py-2 rounded-full w-full"
						placeholder="password"
						type="password"
						id="password"
						value={password()}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
				</div>
				<div class="flex flex-row justify-center w-full">
					<button
						class="btn-primary px-5 py-2 w-full"
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
