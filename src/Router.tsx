import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';

const AppRouter: Component = () => {
	return (
		<>
			<Routes>
				<Route path="/" component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/blog/:id" component={BlogPage} />
			</Routes>
		</>
	);
};

export default AppRouter;
