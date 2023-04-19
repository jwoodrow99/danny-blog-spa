import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

// Pages
import BlogsPage from './pages/BlogsPage';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import NewBlogPage from './pages/NewBlogPage';
import UpdateBlogPage from './pages/UpdateBlogPage';
import UnknownPage from './pages/UnknownPage';

const AppRouter: Component = () => {
	return (
		<>
			<Routes>
				<Route path="/" component={FeedPage} />
				<Route path="/blogs" component={BlogsPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/blog/show/:id" component={BlogPage} />
				<Route path="/blog/new" component={NewBlogPage} />
				<Route path="/blog/update/:id" component={UpdateBlogPage} />
				<Route path="/user/:id" component={UserPage} />
				<Route path="*" component={UnknownPage} />
			</Routes>
		</>
	);
};

export default AppRouter;
