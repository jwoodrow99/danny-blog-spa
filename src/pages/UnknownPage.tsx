import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import styles from './UnknownPage.module.css';

const UnknownPage: Component = () => {
	const navigate = useNavigate();

	createEffect(() => {
		navigate('/');
	});

	return (
		<>
			<div class="h-full flex flex-col justify-center content-center">
				<div class="text-center text-6xl">Unknown Page</div>
			</div>
		</>
	);
};

export default UnknownPage;
