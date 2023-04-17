import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from '@solidjs/router';

import http from '../http';

const LoginPage: Component = () => {
	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);

	const [email, setEmail] = createSignal('');
	const [password, setPassword] = createSignal('');

	const navigate = useNavigate();

	const login = () => {
		http
			.post('/auth/login/', {
				email: email(),
				password: password(),
			})
			.then((response) => {
				localStorage.setItem('access_token', response.data.access_token);
				setAuthenticated(true);
				localStorage.setItem('user', JSON.stringify(response.data.user));
				setUser(response.data.user);
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
			<div class="flex flex-col space-y-3 w-1/2 mx-auto">
				<input
					class="text-black"
					type="text"
					value={email()}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<input
					class="text-black"
					type="text"
					value={password()}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<button
					onClick={() => {
						login();
					}}
				>
					Login
				</button>
			</div>
		</>
	);
};

export default LoginPage;
