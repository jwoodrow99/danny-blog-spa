import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { A as RouteLink } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';

import logo from './logo.svg';
import styles from './App.module.css';

import AppRouter from './Router';

import { GlobalContext } from './GlobalContext';

const App: Component = () => {
	const [authenticated, setAuthenticated]: any = createSignal(false);
	const [user, setUser]: any = createSignal(null);

	const navigate = useNavigate();

	createEffect(() => {
		const accessToken: any = localStorage.getItem('access_token');
		const localStorageUser: any = localStorage.getItem('user');
		if (accessToken && localStorageUser) {
			setAuthenticated(true);
			setUser(JSON.parse(localStorageUser));
		}
		setAuthenticated(false);
		setUser(null);
	});

	const logout = () => {
		setAuthenticated(false);
		setUser(null);
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
	};

	return (
		<>
			<GlobalContext.Provider
				value={{ authenticated, setAuthenticated, user, setUser }}
			>
				<div class="min-h-screen bg-slate-900	text-white">
					<header class="h-16 flex flex-col justify-center content-center">
						<nav class="flex flex-row space-x-5 mx-auto">
							<RouteLink href="/">Home</RouteLink>
							{!authenticated() ? (
								<RouteLink href="/auth/login">Login</RouteLink>
							) : (
								<button
									onClick={() => {
										logout();
									}}
								>
									Logout
								</button>
							)}
						</nav>
					</header>

					<main class="min-h-[calc(100vh-64px-64px)] bg-slate-950	">
						<AppRouter />
					</main>

					<footer class="h-16 flex flex-col justify-center content-center bg-slate-900	">
						<div class="text-center	">This is a demo app.</div>
					</footer>
				</div>
			</GlobalContext.Provider>
		</>
	);
};

export default App;
