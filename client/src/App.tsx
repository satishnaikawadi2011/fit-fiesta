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

function App() {
	// useEffect(() => {
	// 	getAllDataFromStorage();
	// }, []);
	// const { user, expiryDate, token } = useAppSelector((state) => state.auth);
	// const isTokenExpired = isExpired(expiryDate);

	// if (!isTokenExpired && user) {
	// 	apiClient.setHeader('Authorization', `Bearer ${token}`);
	// 	return <AuthenticatedRoutes />;
	// }
	// return <UnauthenticatedRoutes />;

	return (
		<React.Fragment>
			<Box width={600}>
				<Event name='Fitness, Nutrition, and Self-Care for Musicians' date='2023-02-02T16:30:00' description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique omnis cumque laudantium
						modi, voluptatibus doloribus pariatur aliquid enim harum excepturi, voluptatem officiis
						assumenda alias incidunt?' username='jonny' location='Mumbai'/>
			</Box>
			
		</React.Fragment>
	);
}

export default App;
