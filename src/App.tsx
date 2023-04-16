import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { A as RouteLink, useNavigate } from '@solidjs/router';
import { GlobalContext } from './GlobalContext';

import Router from './Router';

const App: Component = () => {
	const [authenticated, setAuthenticated]: any = createSignal(false);

	const navigate = useNavigate();

	createEffect(() => {
		console.log('Render: App');
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			setAuthenticated(true);
		} else {
			navigate('/login');
		}
	});

	const logout = () => {
		localStorage.removeItem('access_token');
		setAuthenticated(false);
		navigate('/login');
	};

	return (
		<>
			<GlobalContext.Provider value={{ authenticated, setAuthenticated }}>
				<header class="h-16 bg-zinc-900	text-white">
					<div class="h-full w-full px-10 flex flex-row justify-center items-center">
						<nav class="w-full flex flex-row justify-between">
							<div class="flex flex-row space-x-3">
								{authenticated() && (
									<>
										<RouteLink class="hover:text-zinc-300" href="/">
											Home
										</RouteLink>
										<RouteLink class="hover:text-zinc-300" href="/new_blog">
											New Blog
										</RouteLink>
									</>
								)}
							</div>
							<div class="flex flex-row space-x-3">
								{!authenticated() && (
									<RouteLink class="hover:text-zinc-300" href="/login">
										Login
									</RouteLink>
								)}
								{authenticated() && (
									<button
										class="hover:text-zinc-300"
										type="button"
										onclick={() => {
											logout();
										}}
									>
										Logout
									</button>
								)}
							</div>
						</nav>
					</div>
				</header>

				<main class="min-h-[calc(100vh-64px-64px)] bg-zinc-950 text-white">
					<div class="md:w-3/4 md:mx-auto px-10 py-7">
						<Router />
					</div>
				</main>

				<footer class="h-16 flex flex-row justify-center items-center bg-zinc-900 text-zinc-500">
					This is a demo app.
				</footer>
			</GlobalContext.Provider>
		</>
	);
};

export default App;
