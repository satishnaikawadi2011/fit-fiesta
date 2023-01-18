import './App.css';
import LandingPage from './pages/landing-page';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';

function App() {
	useEffect(() => {
		getAllDataFromStorage();
	}, []);

	const { user, expiryDate } = useAppSelector((state) => state.auth);
	const isTokenExpired = isExpired(expiryDate);
	// return <h1>My App</h1>;

	if (!isTokenExpired && user) {
		return <AuthenticatedRoutes />;
	}

	return <UnauthenticatedRoutes />;
}

export default App;
