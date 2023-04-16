import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';

import http from '../http';

import styles from './HomePage.module.css';

const HomePage: Component = () => {
	createEffect(async () => {
		const response = await http.get('/blog');
		console.log(response.data);
	});

	return (
		<>
			<h1 class="text-3xl font-bold underline">Home Page</h1>
		</>
	);
};

export default HomePage;
