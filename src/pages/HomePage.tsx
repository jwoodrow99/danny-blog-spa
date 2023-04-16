import type { Component } from 'solid-js';
import { createSignal, createEffect, useContext } from 'solid-js';
import { GlobalContext } from '../GlobalContext';

const HomePage: Component = () => {
	const { authenticated, setAuthenticated, user, setUser }: any =
		useContext(GlobalContext);
	return (
		<>
			<div>Home Page</div>
			<div>
				{authenticated() && <p>Logged In</p>}
				{!authenticated() && <p>NOT Logged In</p>}
			</div>
		</>
	);
};

export default HomePage;
