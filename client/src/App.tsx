import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import React, { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';
import { Box, Flex, Image, Icon, Text, Heading, Divider } from '@chakra-ui/react';
import { ImLocation2 } from 'react-icons/im';
import { CalendarIcon } from '@chakra-ui/icons';
import { GrAddCircle } from 'react-icons/gr';
import Event from './components/Event';
import Resource from './components/Resource';
import UserProfile from './components/UserProfile';

function App() {
	useEffect(() => {
		getAllDataFromStorage();
	}, []);
	const { user, expiryDate, token } = useAppSelector((state) => state.auth);
	const isTokenExpired = isExpired(expiryDate);

	if (!isTokenExpired && user) {
		apiClient.setHeader('Authorization', `Bearer ${token}`);
		// return <AuthenticatedRoutes />;
		return <UserProfile user={user} />;
	}
	return <UnauthenticatedRoutes />;

	// return <UserProfile user={user as any} />;
}

export default App;
