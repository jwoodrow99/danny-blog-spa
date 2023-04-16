import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import NewBlogPage from './pages/NewBlogPage';
import UpdateBlogPage from './pages/UpdateBlogPage';

const AppRouter: Component = () => {
	return (
		<>
			<Routes>
				<Route path="/" component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/blog/show/:id" component={BlogPage} />
				<Route path="/blog/new" component={NewBlogPage} />
				<Route path="/blog/update/:id" component={UpdateBlogPage} />
				<Route path="/user/:id" component={UserPage} />
			</Routes>
		</>
	);
};

export default AppRouter;
