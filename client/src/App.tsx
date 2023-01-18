import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import Header from './components/layout/Header/Header';

function App() {
	// useEffect(() => {
	// 	getAllDataFromStorage();
	// }, []);

	// const { user, expiryDate } = useAppSelector((state) => state.auth);
	// const isTokenExpired = isExpired(expiryDate);
	return <Header />;

	// if (!isTokenExpired && user) {
	// 	return <AuthenticatedRoutes />;
	// }

	// return <UnauthenticatedRoutes />;
}

export default App;
