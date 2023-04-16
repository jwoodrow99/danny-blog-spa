import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { A as RouteLink } from '@solidjs/router';

import Router from './Router';

const App: Component = () => {
	createEffect(() => {
		console.log('Render: App');
	});

	return (
		<>
			<header class="h-16 bg-zinc-900	text-white">
				<div class="h-full flex flex-row justify-center items-center">
					<nav class="flex flex-row space-x-3">
						<RouteLink href="/">Home</RouteLink>
						<RouteLink href="/login">Login</RouteLink>
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
		</>
	);
};

export default App;
