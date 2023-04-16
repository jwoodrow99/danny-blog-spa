import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'http://localhost:3333/',
	timeout: 1000,
	headers: {
		Accept: 'application/json',
	},
});

httpClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');

	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}

	return config;
});

export default httpClient;
