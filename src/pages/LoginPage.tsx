import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { GlobalContext } from '../GlobalContext';

const LoginPage: Component = () => {
	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);

	return (
		<>
			<div>Login Page</div>
		</>
	);
};

export default LoginPage;
