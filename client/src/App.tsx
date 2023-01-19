import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';

function App() {
	useEffect(() => {
		getAllDataFromStorage();
	}, []);
	const { user, expiryDate, token } = useAppSelector((state) => state.auth);
	const isTokenExpired = isExpired(expiryDate);

	if (!isTokenExpired && user) {
		apiClient.setHeader('Authorization', `Bearer ${token}`);
		return <AuthenticatedRoutes />;
	}
	return <UnauthenticatedRoutes />;
}

export default App;
